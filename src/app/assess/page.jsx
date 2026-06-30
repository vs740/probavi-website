"use client";

import { useState } from "react";
import { isMissingDate } from "@/lib/assess";

export default function AssessPage() {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [report, setReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);

  // Send the code-computed results + tally to the drafting route.
  // We pass `data.results` / `data.tally` because that's exactly what
  // /api/assess-file produced and stored in `data`.
  async function generateReport() {
    if (!data) return;
    setReportLoading(true);
    try {
      const res = await fetch("/api/draft-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results: data.results, tally: data.tally }),
      });
      setReport(await res.json());
    } finally {
      setReportLoading(false);
    }
  }

  // Read the file as text in the browser, then POST that text to our route.
  async function handleFile(file) {
    if (!file) return;
    setError(""); setData(null); setReport(null); setFileName(file.name); setLoading(true);
    try {
      const fileText = await file.text();              // browser turns the file into a string
      const res = await fetch("/api/assess-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileText }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Assessment failed.");
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  }

  const badge = (result) => {
    const map = {
      PASS: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      EXCEPTION: "bg-red-50 text-red-700 ring-red-600/20",
      "NEEDS REVIEW": "bg-amber-50 text-amber-700 ring-amber-600/20",
    };
    return `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${map[result] || "bg-gray-100 text-gray-700 ring-gray-300"}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-10 sm:px-8">

        {/* Assessment header — reads like a cover sheet */}
        <header className="border-b border-border pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
            NIST 800-53 Control Assessment
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            PS-5 / AC-2 — Access Removal Assessment
          </h1>
          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <Meta label="System" value="DoT Core HR/Identity System" />
            <Meta label="Period" value="FY25" />
            <Meta label="Removal SLA" value="7 days" />
          </dl>
        </header>

        {/* How it works — context before the upload */}
<div className="mt-8 rounded-xl border border-border bg-surface px-6 py-5">
  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">How it works</p>
  <ol className="mt-3 space-y-2 text-sm text-foreground">
    <li><span className="font-semibold text-steel">1.</span> Upload a personnel-transfer log with access-removal records. Messy plain text is fine; that's the point.</li>
    <li><span className="font-semibold text-steel">2.</span> AI reads each row and pulls the relevant data. Code checks them against the 7-day SLA and tallies the results.</li>
    <li><span className="font-semibold text-steel">3.</span> You get a pass/exception table and a drafted SAR. Every number computed in code, never invented by the AI.</li>
  </ol>
  <p className="mt-3 text-xs text-muted">Upload a <span className="font-medium text-foreground">.txt</span> evidence export. Use the seeded DoT transfer file to see the demo run.</p>
</div>

        {/* One box = drag-and-drop AND click-to-choose (the hidden input does the click part) */}
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`mt-8 flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed text-center transition-colors focus-within:ring-2 focus-within:ring-steel/30 ${
            dragOver ? "border-steel bg-steel/5" : "border-border bg-surface hover:border-steel/50"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-steel">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
          </svg>
          <span className="mt-3 text-sm font-medium text-foreground">
            {fileName ? `Selected: ${fileName}` : "Drag & drop the evidence file here, or click to choose"}
          </span>
          <span className="mt-1 text-xs text-muted">.txt evidence export</span>
          <input
            type="file"
            accept=".txt,text/plain"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>

        {loading && (
          <div className="mt-6 flex items-center gap-2 text-sm text-muted">
            <Spinner /> Reading evidence and assessing…
          </div>
        )}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {data && (
          <>
            {/* Disposition summary — straight from the code-computed numbers */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Pass" value={data.tally.PASS} color="text-emerald-700" accent="bg-emerald-500" />
              <Stat label="Exception" value={data.tally.EXCEPTION} color="text-red-700" accent="bg-red-500" />
              <Stat label="Needs review" value={data.tally["NEEDS REVIEW"]} color="text-amber-700" accent="bg-amber-500" />
              <Stat label="Total" value={data.count} color="text-foreground" accent="bg-steel" />
            </div>

            <p className="mt-4 text-xs text-muted">
              Population: 6,000 transfers · Sample: 1,500 · showing a representative 18-row worklist · engine runs full-population testing.
            </p>

            <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-background text-left">
                    {["Employee", "Transfer", "Removal", "Result", "Reason"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.results.map((r, i) => (
                    <tr key={i} className="border-b border-border last:border-0 even:bg-background/60">
                      <td className="px-4 py-2.5 font-mono text-foreground">{r.extracted.employee_id}</td>
                      <td className="px-4 py-2.5 tabular-nums text-muted">{isMissingDate(r.extracted.transfer_date) ? "—" : r.extracted.transfer_date}</td>
                      <td className="px-4 py-2.5 tabular-nums text-muted">{isMissingDate(r.extracted.removal_date) ? "—" : r.extracted.removal_date}</td>
                      <td className="px-4 py-2.5"><span className={badge(r.verdict.result)}>{r.verdict.result}</span></td>
                      <td className="px-4 py-2.5 text-muted">{r.verdict.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={generateReport}
              disabled={reportLoading}
              className="mt-6 inline-flex items-center rounded-lg bg-steel px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#16304d] disabled:opacity-50"
            >
              {reportLoading ? "Drafting report…" : "Generate Security Assessment Report"}
            </button>

            {report && (
              <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
                <div className="border-b border-border bg-background px-6 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                    Security Assessment Report (SAR)
                  </p>
                  {/* numbers rendered from FACTS (code), prose from NARRATIVE (AI) */}
                  <p className="mt-1 text-sm text-muted">
                    {report.facts.scenario.population} transferred · {report.facts.scenario.sample} sampled ·
                    {" "}{report.facts.tally.PASS} pass / {report.facts.tally.EXCEPTION} exception
                  </p>
                </div>
                <div className="space-y-6 px-6 py-6">
                  {["scope", "methodology", "results", "conclusion"].map((k) => (
                    <section key={k}>
                      <h3 className="text-[11px] font-semibold uppercase tracking-wide text-steel">{k}</h3>
                      <p className="mt-1.5 max-w-prose leading-relaxed text-foreground">{report.narrative[k]}</p>
                    </section>
                  ))}
                  {report.invented?.length > 0 && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      ⚠ Unsanctioned numbers in prose: {report.invented.join(", ")}
                    </div>
                  )}
                  {report.misstated?.length > 0 && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      ⚠ {report.misstated.join(" ")}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, color, accent }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className={`h-1 ${accent}`} />
      <div className="px-4 py-3">
        <div className={`text-3xl font-bold tabular-nums ${color}`}>{value ?? 0}</div>
        <div className="mt-0.5 text-xs uppercase tracking-wide text-muted">{label}</div>
      </div>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-0.5 font-medium text-foreground">{value}</dd>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin text-steel" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}