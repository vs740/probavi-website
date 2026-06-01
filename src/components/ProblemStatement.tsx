export default function ProblemStatement() {
  return (
    <section id="problem" className="border-b border-slate-800/80 bg-[#0d0d0d]">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 lg:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-steel">
          The Problem
        </p>
        <p className="mt-6 max-w-4xl font-heading text-2xl font-medium leading-snug text-slate-200 sm:text-3xl lg:text-4xl">
          Traditional IT audits rely on manual, point-in-time sampling—
          <span className="text-slate-500">
            {" "}
            leaving massive blind spots, draining engineering resources, and risking compliance failures.
          </span>
        </p>
      </div>
    </section>
  );
}
