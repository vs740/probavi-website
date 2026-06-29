// src/lib/llm.js
// The ONLY file that knows which AI provider we use.
// Everything else calls generateJSON() and stays provider-agnostic.
// Switch providers by changing LLM_PROVIDER in .env.local — no other file changes.

const PROVIDER = process.env.LLM_PROVIDER || "gemini"; // "gemini" | "anthropic"

// ---- public API: one normalized function --------------------------------
// Takes a system instruction + a user prompt, returns a PARSED JS object.
export async function generateJSON({ system, prompt }) {
  const raw = await withRetry(() => callProvider({ system, prompt }));
  return safeParseJSON(raw);
}

// ---- provider router -----------------------------------------------------
async function callProvider({ system, prompt }) {
  switch (PROVIDER) {
    case "gemini":    return callGemini({ system, prompt });
    case "anthropic": return callAnthropic({ system, prompt });
    default: throw new Error(`Unknown LLM_PROVIDER: ${PROVIDER}`);
  }
}

// ---- Gemini --------------------------------------------------------------
async function callGemini({ system, prompt }) {
  const { GoogleGenAI } = await import("@google/genai");
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const res = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash", // model now lives in one place (.env.local)
    contents: prompt,
    config: {
      systemInstruction: system,
      responseMimeType: "application/json", // Gemini can return JSON natively
    },
  });
  return res.text;
}

// ---- Anthropic -----------------------------------------------------------
async function callAnthropic({ system, prompt }) {
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const res = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    system,                                    // Anthropic: system is its own field
    messages: [{ role: "user", content: prompt }],
  });
  return res.content[0].text;
}

// ---- shared helpers ------------------------------------------------------
function safeParseJSON(raw) {
  const cleaned = String(raw).replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned); // same defensive parse you built in Brick 3
}

async function withRetry(fn, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try { return await fn(); }
    catch (err) {
      const transient = [429, 503].includes(err?.status);
      if (!transient || i === tries - 1) throw err;
      await new Promise(r => setTimeout(r, 500 * 2 ** i)); // backoff
    }
  }
}