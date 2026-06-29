export const SLA_DAYS = 7;

// A date is "missing" if it's null, undefined, an empty/whitespace string,
// or the literal text "null"/"undefined" (case-insensitive). Models sometimes
// emit the STRING "null" instead of real JSON null, which is truthy and would
// otherwise sneak past a plain `!value` check.
export function isMissingDate(value) {
  if (value == null) return true;                 // catches null AND undefined
  const text = String(value).trim().toLowerCase();
  return text === "" || text === "null" || text === "undefined";
}

export function daysBetween(startISO, endISO) {
  // If either date is missing/unparseable, return NaN instead of doing math
  // on an Invalid Date. Callers must treat NaN as "could not determine".
  if (isMissingDate(startISO) || isMissingDate(endISO)) return NaN;
  const start = new Date(startISO + "T00:00:00Z");
  const end = new Date(endISO + "T00:00:00Z");
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return NaN;
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

export function applyRule({ transfer_date, removal_date, removal_explicitly_never }) {
  // 1. No usable transfer date -> NEEDS REVIEW, BEFORE any date math.
  if (isMissingDate(transfer_date)) {
    return { result: "NEEDS REVIEW", reason: "Transfer date could not be determined." };
  }
  // 2. Text says access was never removed -> EXCEPTION.
  if (removal_explicitly_never) {
    return { result: "EXCEPTION", reason: "Access was never removed (still active/pending)." };
  }
  // 3. No usable removal date -> NEEDS REVIEW.
  if (isMissingDate(removal_date)) {
    return { result: "NEEDS REVIEW", reason: "Removal date could not be determined." };
  }
  // 4. Both dates present: compute the gap. If the math still can't produce a
  //    real number (e.g. a malformed but non-empty date), fail safe.
  const gap = daysBetween(transfer_date, removal_date);
  if (Number.isNaN(gap)) {
    return { result: "NEEDS REVIEW", reason: "Dates could not be parsed to compute the removal gap." };
  }
  if (gap > SLA_DAYS) {
    return { result: "EXCEPTION", reason: `Removed ${gap} days after transfer (SLA ${SLA_DAYS}).` };
  }
  return { result: "PASS", reason: `Removed ${gap} day(s) after transfer (within ${SLA_DAYS}-day SLA).` };
}
