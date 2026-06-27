// CazBid — AL HEARS YOU (Part B, batch). Server-side STT proxy to ElevenLabs Scribe.
// The browser records a burst, POSTs it here as base64; this function sends it to
// ElevenLabs Scribe v2 (batch) with the secret key (process.env.ELEVENLABS_API_KEY —
// NEVER in the front-end bundle) and returns the transcript text. Batch keeps the
// key server-side (no client token/WebSocket) and is ~40x cheaper than realtime.
// ----------------------------------------------------------------------------
const MODEL_ID = "scribe_v2"; // scribe_v1 is deprecated (removed 2026-07-09)

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function extFor(mime) {
  const m = String(mime || "").toLowerCase();
  if (m.indexOf("mp4") >= 0 || m.indexOf("aac") >= 0 || m.indexOf("m4a") >= 0) return "m4a";
  if (m.indexOf("ogg") >= 0) return "ogg";
  if (m.indexOf("wav") >= 0) return "wav";
  if (m.indexOf("mpeg") >= 0 || m.indexOf("mp3") >= 0) return "mp3";
  return "webm";
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: HEADERS, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: "Method not allowed" }) };

  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: "Server missing ELEVENLABS_API_KEY" }) };

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch (e) { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Bad request body" }) }; }
  const b64 = String(body.audioBase64 || "");
  if (!b64) return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "No audio" }) };
  const mime = String(body.mime || "audio/webm");
  const buf = Buffer.from(b64, "base64");
  if (buf.length < 800) return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Audio too short" }) };

  try {
    const fd = new FormData();
    fd.append("model_id", MODEL_ID);
    fd.append("file", new Blob([buf], { type: mime }), "audio." + extFor(mime));
    const res = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: { "xi-api-key": key }, // do NOT set Content-Type — FormData sets the multipart boundary
      body: fd,
    });
    if (!res.ok) {
      const errTxt = await res.text();
      return { statusCode: res.status, headers: HEADERS, body: JSON.stringify({ error: "STT error: " + errTxt.slice(0, 300) }) };
    }
    const d = await res.json();
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ text: String((d && d.text) || "").trim(), language: (d && d.language_code) || "" }) };
  } catch (e) {
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: "Request failed: " + (e.message || String(e)) }) };
  }
};
