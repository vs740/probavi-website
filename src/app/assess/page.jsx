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
      PASS: "bg-green-100 text-green-800",
      EXCEPTION: "bg-red-100 text-red-800",
      "NEEDS REVIEW": "bg-yellow-100 text-yellow-800",
    };
    return `inline-block rounded px-2 py-0.5 text-xs font-semibold ${map[result] || "bg-gray-100 text-gray-700"}`;
  };

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold">PS-5 / AC-2 — Access Removal Assessment</h1>
      <p className="mt-1 text-sm text-gray-600">
        DoT Core HR/Identity System · FY25 · 7-day removal SLA
      </p>

      {/* One box = drag-and-drop AND click-to-choose (the hidden input does the click part) */}
      <label
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`mt-6 flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition ${
          dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
        }`}
      >
        <span className="text-gray-600">
          {fileName ? `Selected: ${fileName}` : "Drag & drop the evidence file here, or click to choose"}
        </span>
        <span className="mt-1 text-xs text-gray-400">.txt evidence export</span>
        <input
          type="file"
          accept=".txt,text/plain"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </label>

      {loading && <p className="mt-4 text-blue-600">Reading evidence and assessing…</p>}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      {data && (
        <>
          {/* Tally — straight from the code-computed numbers */}
          <div className="mt-6 flex gap-4">
            <Stat label="Pass" value={data.tally.PASS} color="text-green-700" />
            <Stat label="Exception" value={data.tally.EXCEPTION} color="text-red-700" />
            <Stat label="Needs review" value={data.tally["NEEDS REVIEW"]} color="text-yellow-700" />
            <Stat label="Total" value={data.count} color="text-gray-700" />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Population: 6,000 transfers · Sample: 1,500 · showing a representative 18-row worklist · engine runs full-population testing.
          </p>

          <table className="mt-4 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="py-2">Employee</th><th>Transfer</th><th>Removal</th><th>Result</th><th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {data.results.map((r, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 font-mono">{r.extracted.employee_id}</td>
                  <td>{isMissingDate(r.extracted.transfer_date) ? "—" : r.extracted.transfer_date}</td>
                  <td>{isMissingDate(r.extracted.removal_date) ? "—" : r.extracted.removal_date}</td>
                  <td><span className={badge(r.verdict.result)}>{r.verdict.result}</span></td>
                  <td className="text-gray-600">{r.verdict.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={generateReport}
            disabled={reportLoading}
            className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {reportLoading ? "Drafting report…" : "Generate Security Assessment Report"}
          </button>

          {report && (
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold">Security Assessment Report</h2>
              {/* numbers rendered from FACTS (code), prose from NARRATIVE (AI) */}
              <p className="text-sm text-gray-600">
                {report.facts.scenario.population} transferred · {report.facts.scenario.sample} sampled ·
                {" "}{report.facts.tally.PASS} pass / {report.facts.tally.EXCEPTION} exception
              </p>
              {["scope", "methodology", "results", "conclusion"].map((k) => (
                <section key={k}>
                  <h3 className="font-medium capitalize">{k}</h3>
                  <p>{report.narrative[k]}</p>
                </section>
              ))}
              {report.invented?.length > 0 && (
                <p className="text-red-600">
                  ⚠ Unsanctioned numbers in prose: {report.invented.join(", ")}
                </p>
              )}
              {report.misstated?.length > 0 && (
                <p className="text-red-600">
                  ⚠ {report.misstated.join(" ")}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="rounded-lg border bg-white px-4 py-3">
      <div className={`text-2xl font-bold ${color}`}>{value ?? 0}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}