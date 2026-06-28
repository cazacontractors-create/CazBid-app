// CazBid — AL's VOICE (Part A of voice capture). Server-side TTS proxy to ElevenLabs.
// The browser POSTs AL's readback text here; this function calls ElevenLabs with the
// secret key (process.env.ELEVENLABS_API_KEY — NEVER in the front-end bundle) and
// returns audio/mpeg bytes. Voice + model are locked per the build scope.
// ----------------------------------------------------------------------------
const DEFAULT_VOICE = "NNl6r8mD7vthiJatiJt1"; // AL — default persona; speak uses the selected persona's voiceId
const MODEL_ID = "eleven_flash_v2_5";        // ElevenLabs: Flash over Turbo in all cases (~75ms)
// allow-list of persona voice IDs (not secret) so the body can't request arbitrary voices
const VOICE_IDS = ["NNl6r8mD7vthiJatiJt1", "pqHfZKP75CvOlQylNhV4", "pNInz6obpgDQGcFmaJgB", "IRHApOXLvnW57QJPQH2P", "onwK4e9ZLuTAKqWW03F9", "nPczCjzI2devNBz1zQrb", "iNwc1Lv2YQLywnCvjfn1", "6rOxfAnZpbM3VIEhFaeV", "hpp4J3VqNfWAUOO0d1Us", "cgSgspJ2msm6clMCkdW9"];

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
function numToWords(n) {
  n = parseInt(n, 10);
  if (isNaN(n) || n < 0 || n > 99) return String(n);
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10), o = n % 10;
  return TENS[t] + (o ? " " + ONES[o] : "");
}

// Speak contractor shorthand the contractor way: "8/12" -> "eight twelve" (pitch),
// units expanded, acronyms left intact (ElevenLabs reads them fine).
function normalizeForSpeech(text) {
  let s = String(text || "");
  s = s.replace(/[*_`#>~]/g, "");                                  // markdown
  s = s.replace(/(\d{1,2})\s*\/\s*12\b/g, (m, a) => numToWords(a) + " twelve"); // roof pitch
  s = s.replace(/\bsq\.?\b/gi, "squares");
  s = s.replace(/\bLF\b/g, "linear feet").replace(/\bSF\b/g, "square feet");
  s = s.replace(/\bea\.?\b/gi, "each");
  s = s.replace(/\s+/g, " ").trim();
  return s.slice(0, 1500);
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: HEADERS, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: HEADERS, body: "Method not allowed" };

  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return { statusCode: 500, headers: HEADERS, body: "Server missing ELEVENLABS_API_KEY" };

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch (e) { return { statusCode: 400, headers: HEADERS, body: "Bad request body" }; }
  const text = normalizeForSpeech(body.text);
  if (!text) return { statusCode: 400, headers: HEADERS, body: "No text to speak" };
  const reqVoice = String(body.voiceId || "");
  const voice = VOICE_IDS.indexOf(reqVoice) >= 0 ? reqVoice : DEFAULT_VOICE;

  try {
    const res = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voice + "/stream", {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json", "Accept": "audio/mpeg" },
      body: JSON.stringify({
        text: text,
        model_id: MODEL_ID,
        voice_settings: { stability: 0.5, similarity_boost: 0.75, use_speaker_boost: true },
      }),
    });
    if (!res.ok) {
      const errTxt = await res.text();
      return { statusCode: res.status, headers: HEADERS, body: "TTS error: " + errTxt.slice(0, 300) };
    }
    const buf = Buffer.from(await res.arrayBuffer());
    return {
      statusCode: 200,
      headers: Object.assign({}, HEADERS, { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" }),
      body: buf.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (e) {
    return { statusCode: 500, headers: HEADERS, body: "Request failed: " + (e.message || String(e)) };
  }
};
