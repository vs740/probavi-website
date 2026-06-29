import { FileCheck2, GitBranch, Radar } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Integrate",
    icon: GitBranch,
    description:
      "Connects seamlessly to AWS, Azure, CI/CD pipelines, and identity providers.",
  },
  {
    num: "02",
    title: "Analyze",
    icon: Radar,
    description:
      "Continuous monitoring against FISCAM/NIST frameworks using our deterministic Proof Engine.",
  },
  {
    num: "03",
    title: "Prove",
    icon: FileCheck2,
    description:
      "Generate cryptographically verifiable, auditor-ready reports in real-time.",
  },
];

export default function HowItWorks() {
  return (
    <section id="workflow" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-steel">
            How It Works
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            From integration to immutable proof
          </h2>
        </div>
        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="group bg-surface p-8 transition-colors hover:bg-background">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-muted">{step.num}</span>
                  <Icon className="h-5 w-5 text-steel" aria-hidden="true" />
                </div>
                <h3 className="mt-8 font-heading text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
