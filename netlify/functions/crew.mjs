/* ============================================================================
   /.netlify/functions/crew — CazBid Crew App data layer (NEW, additive-only)
   ----------------------------------------------------------------------------
   The crew companion app (its own site, cazbid-crew.netlify.app) shares data
   with main CazBid through THIS endpoint only. Nothing here touches or changes
   any endpoint the main app already calls — new file, new Blobs store.

   Store "crew-data":
     jobs           -> [{ id, name, trade, pin, active, estCost, estHours, createdAt }]
     employees      -> [{ id, name, phone, pin (PERSONAL code), jobIds: [], active, createdAt }]
                       — a personal code is a second way in: join/jobs/all/log accept EITHER a
                       job code (everyone on that job) OR an employee code (that person's
                       assigned jobs). Managed from the main app (emp-set / emp-list).
     crew           -> [{ id, name, phone, firstSeen }]
     log:<jobId>    -> [{ id, kind: "cost"|"hours"|"timer"|"co", crewName, crewPhone,
                          at (device ISO), receivedAt (server ISO), ...kind fields }]

   POST ops (JSON body { op, ... }):
     setup  { job:{ id?, name, trade, pin, estCost, estHours, active }, currentPin? }
            -> upsert a job. Creating is open (foreman does it from the crew app until
               the main-app management panel ships); MODIFYING an existing job requires
               its current pin. Returns { job }.
     join   { pin, name, phone } -> { crewId, jobs:[{id,name,trade,estCost,estHours}] }
            (active jobs matching the pin; pins never echo back)
     log    { jobId, pin, entries:[...] } -> { ok, count } — APPEND-ONLY (audit trail:
            crew can add, never edit or delete). Caps: 50 entries/call, 100KB body,
            8KB per entry (receipt/CO photos stay in the crew app device, not here).
   GET ops:
     ?op=jobs&pin=...            -> { jobs } (same shape as join)
     ?op=log&job=<id>&pin=...    -> { job, entries } (crew refresh + the main app's
                                    later Crew Activity panel read the same way)
   ========================================================================== */
import { getStore } from "@netlify/blobs";

const CORS = { "access-control-allow-origin": "*", "access-control-allow-methods": "GET,POST,OPTIONS", "access-control-allow-headers": "Content-Type" };
const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: Object.assign({ "content-type": "application/json", "cache-control": "no-store" }, CORS) });
const rid = () => Math.random().toString(36).slice(2, 10);
const S = (v, n) => String(v == null ? "" : v).slice(0, n || 200);
const N = (v) => { const x = parseFloat(v); return isNaN(x) ? 0 : x; };
const KINDS = ["cost", "hours", "timer", "co"];

const pubJob = (j) => ({ id: j.id, name: j.name, trade: j.trade || "", estCost: N(j.estCost), estHours: N(j.estHours) }); // pins never leave the server (except emp-list, which the boss unlocks with a JOB code)
const empByPin = (emps, pin) => (emps || []).find((e) => e.active !== false && e.pin === pin) || null;
const jobsForPin = (jobs, emps, pin) => {
  const emp = empByPin(emps, pin);
  if (emp) { const set = new Set(emp.jobIds || []); return { emp, jobs: jobs.filter((j) => j.active !== false && set.has(j.id)) }; }
  return { emp: null, jobs: jobs.filter((j) => j.active !== false && j.pin === pin) };
};
const canLog = (job, emps, pin) => !!job && (job.pin === pin || (() => { const e = empByPin(emps, pin); return !!(e && (e.jobIds || []).indexOf(job.id) >= 0); })());

export default async (req) => {
  if (req.method === "OPTIONS") return new Response("", { status: 200, headers: CORS });
  let store;
  try { store = getStore({ name: "crew-data", consistency: "strong" }); }
  catch (e) { return json({ error: "store unavailable: " + String((e && e.message) || e) }, 500); }

  try {
    const url = new URL(req.url);

    if (req.method === "GET") {
      const op = url.searchParams.get("op") || "";
      const pin = S(url.searchParams.get("pin"), 40);
      const jobs = (await store.get("jobs", { type: "json" })) || [];
      const emps = (await store.get("employees", { type: "json" })) || [];
      if (op === "jobs") {
        if (!pin) return json({ error: "pin required" }, 400);
        return json({ jobs: jobsForPin(jobs, emps, pin).jobs.map(pubJob) });
      }
      if (op === "all") {
        // SCHEDULE VIEW: any crew member with a valid code (job OR personal) can SEE the whole
        // active board (name/trade/est man-hours). Logging stays locked to assigned/coded jobs.
        const mineSet = new Set(jobsForPin(jobs, emps, pin).jobs.map((j) => j.id));
        if (!pin || (!mineSet.size && !jobs.some((j) => j.active !== false && j.pin === pin) && !empByPin(emps, pin))) return json({ error: "a valid crew code is required" }, 403);
        return json({ jobs: jobs.filter((j) => j.active !== false).map((j) => ({ id: j.id, name: j.name, trade: j.trade || "", estHours: N(j.estHours), mine: mineSet.has(j.id), estCost: mineSet.has(j.id) ? N(j.estCost) : 0 })) });
      }
      if (op === "log") {
        const jobId = S(url.searchParams.get("job"), 40);
        const job = jobs.find((j) => j.id === jobId);
        if (!canLog(job, emps, pin)) return json({ error: "not found" }, 404); // wrong pin reads as missing
        const entries = (await store.get("log:" + jobId, { type: "json" })) || [];
        return json({ job: pubJob(job), entries });
      }
      if (op === "emp-list") {
        // BOSS VIEW: unlocked by a JOB code (the main app holds those) — an employee's personal
        // code deliberately does NOT open the roster, so crew can't read each other's codes.
        if (!pin || !jobs.some((j) => j.pin === pin)) return json({ error: "a job crew code is required" }, 403);
        return json({ employees: emps.map((e) => ({ id: e.id, name: e.name, phone: e.phone || "", pin: e.pin, jobIds: e.jobIds || [], active: e.active !== false })) });
      }
      return json({ error: "unknown op" }, 400);
    }

    if (req.method !== "POST") return json({ error: "method not allowed" }, 405);
    const raw = await req.text();
    if (raw.length > 100 * 1024) return json({ error: "body over 100KB" }, 400);
    let body; try { body = JSON.parse(raw || "{}"); } catch { return json({ error: "bad JSON" }, 400); }
    const op = S(body.op, 20);

    if (op === "setup") {
      const j = body.job || {};
      const name = S(j.name, 120); const pin = S(j.pin, 40);
      if (!name || !pin || pin.length < 4) return json({ error: "job name + a pin of 4+ characters required" }, 400);
      const jobs = (await store.get("jobs", { type: "json" })) || [];
      const id = S(j.id, 40) || ("cw" + Date.now().toString(36) + rid().slice(0, 3));
      const idx = jobs.findIndex((x) => x.id === id);
      if (idx >= 0 && jobs[idx].pin !== S(body.currentPin, 40)) return json({ error: "current pin required to modify this job" }, 403);
      const rec = { id, name, trade: S(j.trade, 40), pin, active: j.active !== false, estCost: N(j.estCost), estHours: N(j.estHours), createdAt: idx >= 0 ? jobs[idx].createdAt : new Date().toISOString() };
      if (idx >= 0) jobs[idx] = rec; else jobs.push(rec);
      await store.setJSON("jobs", jobs);
      return json({ job: pubJob(rec) });
    }

    if (op === "emp-set") {
      // Main-app crew management: create/update an employee (personal code + assigned jobs).
      // Same Phase-1 trust posture as `setup` (the store endpoint is open site-wide anyway).
      const e = body.employee || {};
      const name = S(e.name, 80); const pin = S(e.pin, 40);
      if (!name || pin.length < 4) return json({ error: "employee name + a personal code of 4+ characters required" }, 400);
      const emps = (await store.get("employees", { type: "json" })) || [];
      const jobsAll = (await store.get("jobs", { type: "json" })) || [];
      if (jobsAll.some((j) => j.pin === pin)) return json({ error: "that code is already a JOB code — pick a different personal code" }, 400);
      const id = S(e.id, 40) || ("em" + Date.now().toString(36) + rid().slice(0, 3));
      if (emps.some((x) => x.id !== id && x.pin === pin)) return json({ error: "another employee already has that code" }, 400);
      const idx = emps.findIndex((x) => x.id === id);
      const rec = { id, name, phone: S(e.phone, 30), pin, jobIds: Array.isArray(e.jobIds) ? e.jobIds.map((x) => S(x, 40)).slice(0, 100) : [], active: e.active !== false, createdAt: idx >= 0 ? emps[idx].createdAt : new Date().toISOString() };
      if (idx >= 0) emps[idx] = rec; else emps.push(rec);
      await store.setJSON("employees", emps);
      return json({ employee: rec });
    }

    if (op === "close") {
      // CREW CLOSE-OUT: job's done — hide it from crew phones. Anyone who can LOG to the job can
      // close it. Dustin's Crew Activity panel still reads the log (op=log ignores active), and
      // re-linking from the main app reactivates the job.
      const jobId = S(body.jobId, 40); const pin = S(body.pin, 40);
      const jobs = (await store.get("jobs", { type: "json" })) || [];
      const empsC = (await store.get("employees", { type: "json" })) || [];
      const job = jobs.find((j) => j.id === jobId);
      // auth: the job's own code / an assigned employee — OR any JOB code (boss/foreman
      // credential, same gate as emp-list; cleans up stray test jobs from the main app).
      const bossCred = jobs.some((j) => j.pin === pin);
      if (!job || (!canLog(job, empsC, pin) && !bossCred)) return json({ error: "not found" }, 404);
      job.active = false;
      await store.setJSON("jobs", jobs);
      return json({ ok: true });
    }

    if (op === "join") {
      const pin = S(body.pin, 40); const name = S(body.name, 80); const phone = S(body.phone, 30);
      if (!pin || !name) return json({ error: "name and pin required" }, 400);
      const jobs = (await store.get("jobs", { type: "json" })) || [];
      const empsJ = (await store.get("employees", { type: "json" })) || [];
      const mine = jobsForPin(jobs, empsJ, pin).jobs;
      if (!mine.length) return json({ error: "no active job matches that code — if it's your personal code, ask the boss to assign you a job" }, 404);
      const crew = (await store.get("crew", { type: "json" })) || [];
      let member = crew.find((c) => c.name.toLowerCase() === name.toLowerCase() && c.phone === phone);
      if (!member) { member = { id: "cm" + rid(), name, phone, firstSeen: new Date().toISOString() }; crew.push(member); await store.setJSON("crew", crew); }
      return json({ crewId: member.id, jobs: mine.map(pubJob) });
    }

    if (op === "log") {
      const jobId = S(body.jobId, 40); const pin = S(body.pin, 40);
      const jobs = (await store.get("jobs", { type: "json" })) || [];
      const empsL = (await store.get("employees", { type: "json" })) || [];
      const job = jobs.find((j) => j.id === jobId);
      if (!canLog(job, empsL, pin)) return json({ error: "not found" }, 404);
      const incoming = Array.isArray(body.entries) ? body.entries.slice(0, 50) : [];
      if (!incoming.length) return json({ error: "no entries" }, 400);
      const key = "log:" + jobId;
      const existing = (await store.get(key, { type: "json" })) || [];
      const seen = new Set(existing.map((e) => e.id));
      const now = new Date().toISOString();
      const clean = [];
      for (const e of incoming) {
        if (!e || KINDS.indexOf(e.kind) < 0) continue;
        const s = JSON.stringify(e); if (s.length > 8 * 1024) continue; // photos live on-device, not here
        const id = S(e.id, 40) || ("ce" + rid());
        if (seen.has(id)) continue; // offline-queue retries are idempotent
        seen.add(id);
        clean.push(Object.assign({}, e, { id, kind: e.kind, crewName: S(e.crewName, 80), crewPhone: S(e.crewPhone, 30), at: S(e.at, 40) || now, receivedAt: now }));
      }
      if (!clean.length) return json({ ok: true, count: 0 });
      await store.setJSON(key, existing.concat(clean));
      return json({ ok: true, count: clean.length });
    }

    return json({ error: "unknown op" }, 400);
  } catch (e) {
    return json({ error: String((e && e.message) || e) }, 500);
  }
};
