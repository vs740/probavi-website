// src/lib/report.js — pure code, no AI. This file OWNS the numbers.

export const SCENARIO = {
  agency: "Department of Test (DoT)",
  system: "DoT Core HR/Identity System (FY25 ATO)",
  control: "PS-5 (Personnel Transfer), overlapping AC-2 (Account Management)",
  period: "Jan–Dec 2025",
  slaDays: 7,
  population: 6000,
  sample: 1500,
};

// Freeze the deterministic facts from the code-computed results.
// results[] items are { extracted, verdict }; verdict is { result, reason }.
export function buildFacts({ results, tally }) {
  const exceptions = results
    .filter(r => r.verdict.result === "EXCEPTION")
    .map(r => ({
      employeeId: r.extracted.employee_id,
      transferDate: r.extracted.transfer_date,
      removalDate: r.extracted.removal_date ?? "not removed",
      reason: r.verdict.reason,
    }));

  return { scenario: SCENARIO, tally, exceptions };
}

// GUARD 1 — flags any number in the prose that exists NOWHERE in the facts.
// Blunt: catches fully-invented numbers (e.g. "52 exceptions"), but NOT a real
// number reused in the wrong place (e.g. the SLA "7" misused as a count).
export function findInventedNumbers(narrative, facts) {
  const allowed = new Set();
  const harvest = (v) => String(v).match(/\d+/g)?.forEach(n => allowed.add(n));

  Object.values(facts.scenario).forEach(harvest);
  Object.values(facts.tally).forEach(harvest);
  facts.exceptions.forEach(e => harvest(JSON.stringify(e)));

  const prose = Object.values(narrative).join(" ");
  const used = prose.match(/\d{1,4}/g) || [];
  return [...new Set(used.filter(n => !allowed.has(n)))];
}

// GUARD 2 — sharper: checks the load-bearing exception COUNT in its exact place.
// Catches the case Guard 1 misses (prose says "7 exceptions" when code computed 5),
// even though 7 is a real number elsewhere (the SLA).
export function findMisstatedCounts(narrative, facts) {
  const prose = Object.values(narrative).join(" ");
  const problems = [];

  const realExceptions = facts.tally.EXCEPTION;
  const claimed = [...prose.matchAll(/(\d+)\s+exceptions?/gi)].map(m => Number(m[1]));
  for (const n of claimed) {
    if (n !== realExceptions) {
      problems.push(`Prose claims ${n} exceptions; code computed ${realExceptions}.`);
    }
  }
  return problems;
}