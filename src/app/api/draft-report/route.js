// src/app/api/draft-report/route.js
import { NextResponse } from "next/server";
import { generateJSON } from "@/lib/llm";
import { buildFacts, findInventedNumbers, findMisstatedCounts } from "@/lib/report";

export async function POST(req) {
  const { results, tally } = await req.json();   // computed by code in assess-file
  const facts = buildFacts({ results, tally });  // numbers FROZEN here

  const system = [
    "You draft the narrative prose of a NIST 800-53 Security Assessment Report (SAR).",
    "You are given FIXED FACTS as JSON: counts, dates, control IDs.",
    "Use every number EXACTLY as given. Never calculate, change, round, or invent a number, date, or count.",
    "If a number is not in the facts, do not state it.",
    'Return ONLY JSON with string keys: "scope", "methodology", "results", "conclusion".',
  ].join(" ");

  const prompt = `FIXED FACTS:\n${JSON.stringify(facts, null, 2)}\n\nDraft the four sections as JSON.`;

  const narrative = await generateJSON({ system, prompt });
  const invented = findInventedNumbers(narrative, facts);
  const misstated = findMisstatedCounts(narrative, facts);

  return NextResponse.json({ facts, narrative, invented, misstated });
}
