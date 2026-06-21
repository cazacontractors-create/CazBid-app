// Caza Estimator — job result poller (regular fast function, well under 10s).
// The app polls GET /.netlify/functions/estimate-result?job=<jobId> while the
// background estimate runs. Returns { status: "pending" } until the background
// function has written { status: "done", text, manualUsed } or { status: "error", error }.

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: HEADERS, body: "" };

  const jobId = (event.queryStringParameters || {}).job;
  if (!jobId) return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ status: "error", error: "Missing job id" }) };

  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore({ name: "cazbid-jobs", consistency: "strong" });
    const raw = await store.get(jobId); // a JSON string written by the background fn, or null
    if (!raw) return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ status: "pending" }) };
    // raw is already the JSON we want ({status, text/error, ...}); pass it straight through
    return { statusCode: 200, headers: HEADERS, body: raw };
  } catch (e) {
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ status: "error", error: "Result lookup failed: " + (e.message || String(e)) }) };
  }
};
