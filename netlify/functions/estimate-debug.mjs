/* ============================================================================
   /.netlify/functions/estimate-debug — CazBid diagnostic-bundle share links
   ----------------------------------------------------------------------------
   Stores a per-estimate diagnostic "flight recorder" bundle in a Netlify Blobs
   store (`est-debug`) under a crypto-random id, so a bundle can be handed to an
   advisor (Claude can web_fetch the link) or diffed run-to-run.

   POST   body = bundle JSON (<=256 KB)  -> { id, url }   (stores { createdAt, bundle })
   GET    ?id=<id>                       -> the bundle JSON (404 if missing/expired)
   DELETE ?id=<id>                       -> { ok:true }    (revoke a link)

   SECURITY: anyone with the link can read that bundle (it contains costs+margin).
   Links are UNGUESSABLE (144-bit random id), not private. Mitigations: high id
   entropy, a 30-day TTL (GET deletes+404s an expired bundle), and DELETE to
   revoke. There is NO list/enumerate endpoint, ever. Matches the app's Phase-1
   trust model (no auth system yet).
   ========================================================================== */
import { getStore } from "@netlify/blobs";

const TTL_DAYS = 30;
const MAX_BYTES = 256 * 1024;
const B62 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// 24 base62 chars from CSPRNG bytes (~142 bits) — unguessable.
function randId(n) {
  const a = new Uint8Array(n);
  globalThis.crypto.getRandomValues(a);
  let s = "";
  for (let i = 0; i < n; i++) s += B62[a[i] % 62];
  return s;
}

const CORS = { "access-control-allow-origin": "*", "access-control-allow-methods": "GET,POST,DELETE,OPTIONS", "access-control-allow-headers": "Content-Type" };
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: Object.assign({ "content-type": "application/json", "cache-control": "no-store" }, CORS) });

export default async (req) => {
  if (req.method === "OPTIONS") return new Response("", { status: 200, headers: CORS });

  let store;
  try {
    store = getStore({ name: "est-debug", consistency: "strong" });
  } catch (e) {
    return json({ error: "blob store unavailable: " + String((e && e.message) || e) }, 500);
  }

  const url = new URL(req.url);
  const id = (url.searchParams.get("id") || "").trim();

  try {
    if (req.method === "POST") {
      const raw = await req.text();
      if (!raw || raw.length > MAX_BYTES) return json({ error: "body missing or over 256 KB" }, 400);
      let bundle;
      try { bundle = JSON.parse(raw); } catch { return json({ error: "body is not valid JSON" }, 400); }
      if (!bundle || typeof bundle !== "object") return json({ error: "expected a JSON object" }, 400);
      const newId = randId(24);
      await store.setJSON(newId, { createdAt: Date.now(), bundle });
      return json({ id: newId, url: url.origin + "/.netlify/functions/estimate-debug?id=" + newId });
    }

    if (req.method === "GET") {
      if (!id) return json({ error: "not found" }, 404); // no id => no listing, ever
      const rec = await store.get(id, { type: "json" });
      if (!rec) return json({ error: "not found" }, 404);
      if (rec.createdAt && (Date.now() - rec.createdAt) > TTL_DAYS * 86400000) {
        try { await store.delete(id); } catch { /* best-effort */ }
        return json({ error: "expired" }, 404);
      }
      return json(rec.bundle);
    }

    if (req.method === "DELETE") {
      if (!id) return json({ error: "missing id" }, 400);
      await store.delete(id);
      return json({ ok: true });
    }

    return json({ error: "method not allowed" }, 405);
  } catch (e) {
    return json({ error: String((e && e.message) || e) }, 500);
  }
};
