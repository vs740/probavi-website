export default function ProblemStatement() {
  return (
    <section id="problem" className="border-b border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 lg:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-steel">
          The Problem
        </p>
        <p className="mt-6 max-w-4xl font-heading text-2xl font-medium leading-snug text-foreground sm:text-3xl lg:text-4xl">
          Traditional IT audits rely on manual, point-in-time sampling—
          <span className="text-muted">
            {" "}
            leaving massive blind spots, draining engineering resources, and risking compliance failures.
          </span>
        </p>
      </div>
    </section>
  );
}
