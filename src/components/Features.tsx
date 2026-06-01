import { Fingerprint, Radar, Sigma } from "lucide-react";

const features = [
  {
    icon: Sigma,
    tech: "100% Data Coverage",
    value: "Eliminate audit fatigue and drastically reduce hours spent gathering evidence.",
  },
  {
    icon: Radar,
    tech: "Real-time Tracking",
    value: "Maintain continuous compliance posture without manual intervention.",
  },
  {
    icon: Fingerprint,
    tech: "Cryptographically Verifiable Proofs",
    value: "Ensure absolute trust with mathematically backed audit trails.",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-b border-slate-800/80 bg-[#0d0d0d]">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-steel">
            The Proof Engine
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            Engineered for finality, measured in outcomes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            PROBAVI pairs fine-tuned LLMs with deterministic mathematical rule engines so
            findings are explainable, reproducible, and grounded in machine-verifiable logic.
          </p>
        </div>
        <div className="mt-12 grid gap-px border border-slate-800 bg-slate-800 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.tech}
                className="flex flex-col bg-[#161616] p-8 transition-colors hover:bg-[#191919]"
              >
                <span className="flex h-10 w-10 items-center justify-center border border-steel/40 bg-steel/10">
                  <Icon className="h-5 w-5 text-steel" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-heading text-lg font-semibold text-slate-50">
                  {feature.tech}
                </h3>
                <div className="mt-3 h-px w-10 bg-steel/50" />
                <p className="mt-3 text-sm leading-6 text-slate-400">{feature.value}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
