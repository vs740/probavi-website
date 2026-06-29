import { applyRule } from "@/lib/assess";
import { generateJSON } from "@/lib/llm";

// Prompt now asks for an ARRAY — one object per employee record, all in one go.
// Instruction/role half -> sent as the `system` argument.
const SYSTEM = `You are extracting facts from an audit evidence file about employee role
transfers and the removal of their old system access. The file has a few header lines,
then one record per employee. Formats are inconsistent (different analysts wrote them).

For EACH employee record (IGNORE the header lines), produce one object. Return ONLY a JSON
object of exactly this shape, nothing else:

{
  "rows": [
    {
      "employee_id": "EMP-1042",
      "transfer_date": "YYYY-MM-DD or null",
      "removal_date": "YYYY-MM-DD or null",
      "removal_explicitly_never": true or false,
      "confidence_note": "short note if ambiguous, else empty string"
    }
  ]
}

Rules:
- Normalize every date to YYYY-MM-DD.
- transfer_date: when the employee changed roles/transferred. null if not determinable.
- removal_date: when their OLD access was removed/revoked/deprovisioned/disabled/terminated. null if not stated.
- removal_explicitly_never: true ONLY if the text says access was never removed, is still active, or still pending.
- Do NOT decide pass/fail. Do NOT calculate anything. Extract dates exactly as written.
- If a date is genuinely not stated, use null. Do NOT guess a date.`;

// Data half -> sent as the `prompt` argument.
function buildPrompt(fileText) {
  return `Evidence file:
"""${fileText}"""`;
}

export async function POST(request) {
  try {
    const { fileText } = await request.json();
    if (!fileText || !fileText.trim()) {
      return Response.json({ ok: false, error: "No file text provided." }, { status: 400 });
    }

    // The shared provider layer owns the SDK call, retry/backoff, and parsing.
    // It returns a PARSED object — expect the same { rows: [...] } shape as before.
    const parsed = await generateJSON({ system: SYSTEM, prompt: buildPrompt(fileText) });

    const extractedRows = Array.isArray(parsed.rows) ? parsed.rows : [];

    // CODE applies the rule to each extracted row. The AI decided nothing.
    const results = extractedRows.map((extracted) => ({
      extracted,
      verdict: applyRule(extracted),
    }));

    // CODE does the tally too — never let the model count.
    const tally = { PASS: 0, EXCEPTION: 0, "NEEDS REVIEW": 0 };
    for (const r of results) {
      tally[r.verdict.result] = (tally[r.verdict.result] || 0) + 1;
    }

    return Response.json({ ok: true, count: results.length, tally, results });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
