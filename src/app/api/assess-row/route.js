import { generateJSON } from "@/lib/llm";

const SLA_DAYS = 7;

// ---- 1. THE PROMPT: the AI does EXTRACTION ONLY. No verdicts, no math. ----
// Instruction/role half -> sent as the `system` argument.
const SYSTEM = `You are extracting facts from one messy line of audit evidence about an
employee role transfer and the removal of their old system access.

Return ONLY a JSON object (no markdown, no commentary) with exactly these fields:
- "employee_id": the identifier, e.g. "EMP-1042"
- "transfer_date": the date the employee transferred/changed roles, as "YYYY-MM-DD".
   Use null if no transfer date can be determined.
- "removal_date": the date their old access was removed/revoked/deprovisioned/disabled,
   as "YYYY-MM-DD". Use null if no removal date is stated.
- "removal_explicitly_never": true if the text says access was never removed, is still
   active, or is still pending. Otherwise false.
- "confidence_note": a short note about anything ambiguous, or "" if clear.

Do NOT decide pass or fail. Do NOT calculate anything. Only extract the dates exactly
as written, normalized to YYYY-MM-DD. If a date is genuinely not stated, use null —
do not guess.`;

// Data half -> sent as the `prompt` argument.
function buildPrompt(row) {
  return `Evidence line:
"""${row}"""`;
}

// ---- 2. THE RULE: runs in CODE. The LLM never touches this. ----
function applyRule({ transfer_date, removal_date, removal_explicitly_never }) {
  if (!transfer_date) {
    return { result: "NEEDS REVIEW", reason: "Transfer date could not be determined." };
  }
  if (removal_explicitly_never) {
    return { result: "EXCEPTION", reason: "Access was never removed (still active/pending)." };
  }
  if (!removal_date) {
    return { result: "NEEDS REVIEW", reason: "Removal date could not be determined." };
  }
  const gap = daysBetween(transfer_date, removal_date);
  if (gap > SLA_DAYS) {
    return { result: "EXCEPTION", reason: `Removed ${gap} days after transfer (SLA ${SLA_DAYS}).` };
  }
  return { result: "PASS", reason: `Removed ${gap} day(s) after transfer (within ${SLA_DAYS}-day SLA).` };
}

function daysBetween(startISO, endISO) {
  // Parse at UTC midnight so daylight-saving shifts can't add/drop a day.
  const start = new Date(startISO + "T00:00:00Z");
  const end = new Date(endISO + "T00:00:00Z");
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

// ---- 3. THE ROUTE: receives a row, calls AI, applies rule, returns both. ----
export async function POST(request) {
  try {
    const { row } = await request.json();           // read the row from the request body
    if (!row) {
      return Response.json({ ok: false, error: "No 'row' provided." }, { status: 400 });
    }

    // The shared provider layer owns the SDK call, retry/backoff, and parsing.
    // It returns a PARSED object — do NOT JSON.parse this again.
    const extracted = await generateJSON({ system: SYSTEM, prompt: buildPrompt(row) });

    const verdict = applyRule(extracted);                 // code decides, not the AI

    return Response.json({ ok: true, extracted, verdict });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
