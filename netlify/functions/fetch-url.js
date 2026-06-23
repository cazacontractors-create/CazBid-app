// Caza Estimator — supplier-API/URL proxy for price imports (Stage 2b method 2).
// ----------------------------------------------------------------------------
// GET /.netlify/functions/fetch-url?url=<https url>
//   -> { contentType, text }   (the supplier feed's body, so the browser can
//      parse it as CSV/JSON without CORS issues)
// A builder who has a price API/feed points this at it; the result runs through
// the SAME column-map -> review -> commit gate as a CSV. Timeout-guarded and
// size-capped; never blocks an estimate (it's a separate import action).
//
// SSRF guard: only https, and reject obvious localhost / private-network hosts.
// (Hostname-level guard — not a full IP/DNS check; fine for a personal tool.)

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function isBlockedHost(host) {
  const h = String(host || "").toLowerCase();
  if (!h) return true;
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (h === "127.0.0.1" || h === "0.0.0.0" || h === "::1" || h === "[::1]") return true;
  // private / link-local IPv4 literals
  if (/^10\./.test(h)) return true;
  if (/^192\.168\./.test(h)) return true;
  if (/^169\.254\./.test(h)) return true;
  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(h)) return true;
  if (/^100\.(6[4-9]|[7-9][0-9]|1[0-1][0-9]|12[0-7])\./.test(h)) return true; // CGNAT
  return false;
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: HEADERS, body: "" };

  const url = (event.queryStringParameters || {}).url || "";
  let parsed;
  try { parsed = new URL(url); } catch (e) { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Invalid URL" }) }; }
  if (parsed.protocol !== "https:") return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Only https:// URLs are allowed" }) };
  if (isBlockedHost(parsed.hostname)) return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "That host isn't allowed" }) };

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(parsed.toString(), { headers: { "User-Agent": "CazBid-price-import" }, signal: ctrl.signal });
    clearTimeout(t);
    const contentType = res.headers.get("content-type") || "";
    let text = await res.text();
    if (!res.ok) return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ error: "Supplier feed returned " + res.status }) };
    if (text.length > 2000000) text = text.slice(0, 2000000); // 2 MB cap
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ contentType: contentType, text: text }) };
  } catch (e) {
    clearTimeout(t);
    const msg = (e && e.name === "AbortError") ? "Supplier feed timed out" : ("Couldn't reach the supplier feed: " + ((e && e.message) || String(e)));
    return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ error: msg }) };
  }
};
