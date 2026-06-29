import { GoogleGenAI } from "@google/genai";

// This line runs ONLY on the server (Node), never in the browser.
// It reads the key from .env.local. The browser never sees this object.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// A GET handler: when the browser hits /api/hello-gemini, this runs.
export async function GET() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",                          // known-good free-tier model
      contents: "In one sentence, say hello and confirm you're running.",
    });

    // response.text is the model's reply. We hand ONLY this back to the browser.
    return Response.json({ ok: true, text: response.text });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}