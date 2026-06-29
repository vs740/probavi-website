import { ShieldCheck } from "lucide-react";

const frameworks = [
  { name: "FASAB", detail: "Federal accounting standards" },
  { name: "NIST", detail: "800-53 control families" },
  { name: "FISCAM", detail: "Federal information systems" },
  { name: "FedRAMP / IL4", detail: "Authorization readiness" },
];

export default function Compliance() {
  return (
    <section id="compliance" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-steel">
            Compliance Frameworks
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Mapped to the standards auditors require
          </h2>
        </div>
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {frameworks.map((framework) => (
            <div
              key={framework.name}
              className="bg-surface p-6 transition-colors hover:bg-background"
            >
              <ShieldCheck className="h-5 w-5 text-steel" aria-hidden="true" />
              <p className="mt-5 font-heading text-lg font-semibold tracking-tight text-foreground">
                {framework.name}
              </p>
              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                {framework.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
