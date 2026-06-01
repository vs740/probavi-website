import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

const proofRows = [
  { id: "AC-2", label: "Access provisioning", status: "VERIFIED" },
  { id: "AU-6", label: "Audit log integrity", status: "VERIFIED" },
  { id: "CM-3", label: "Change control", status: "VERIFIED" },
  { id: "IA-5", label: "Credential rotation", status: "VERIFIED" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-slate-800/80">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(70,130,180,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(70,130,180,0.35) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(70,130,180,0.22),transparent_70%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-20 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 border border-slate-800 bg-[#161616] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.22em] text-steel">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            DoD 2028 Audit Mandate Ready
          </p>
          <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
            Absolute Finality for IT Audit
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            Transforming audit-readiness from manual sampling to 100% automated verification.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 border border-steel bg-steel px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3a6d98]"
            >
              Request Technical Briefing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="#workflow"
              className="inline-flex items-center gap-2 border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-steel hover:text-white"
            >
              See How It Works
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="border border-slate-800 bg-[#161616] shadow-[0_0_60px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                proof_engine // live
              </span>
              <span className="flex items-center gap-2 font-mono text-[0.7rem] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse bg-emerald-400" />
                STREAMING
              </span>
            </div>
            <div className="divide-y divide-slate-800/70">
              {proofRows.map((row) => (
                <div key={row.id} className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-steel">{row.id}</span>
                    <span className="text-sm text-slate-300">{row.label}</span>
                  </div>
                  <span className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 divide-x divide-slate-800 border-t border-slate-800">
              {[
                { k: "Coverage", v: "100%" },
                { k: "Controls", v: "1,284" },
                { k: "Exceptions", v: "0" },
              ].map((stat) => (
                <div key={stat.k} className="px-4 py-4">
                  <p className="font-heading text-xl font-semibold text-slate-50">{stat.v}</p>
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">
                    {stat.k}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate-600">
            Representative platform output
          </p>
        </div>
      </div>
    </section>
  );
}
