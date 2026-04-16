import Image from "next/image";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { BadgeCheck, Fingerprint, Mail, Radar, ShieldCheck, Sigma } from "lucide-react";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Home() {
  const microBorder =
    "bg-[linear-gradient(135deg,rgba(30,41,59,0.9),rgba(148,163,184,0.55))] p-px";
  const panel =
    "relative overflow-hidden rounded-[1.05rem] bg-white/92 backdrop-blur-xl transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(70,130,180,0.22)]";

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgba(191,219,254,0.28) 0.8px, transparent 0.8px), linear-gradient(rgba(191,219,254,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(191,219,254,0.09) 1px, transparent 1px)",
          backgroundSize: "26px 26px, 52px 52px, 52px 52px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(191,219,254,0.26),transparent_46%)]" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-12 md:px-10 lg:px-12">
        <nav className="sticky top-4 z-20 rounded-2xl border border-blue-200/60 bg-white/75 px-5 py-3 backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-4">
            <p className={`${monoFont.className} text-xs uppercase tracking-[0.28em] text-blue-800`}>PROBAVI</p>
            <div className={`${monoFont.className} flex items-center gap-2 text-xs text-blue-700 sm:gap-4`}>
              <a className="rounded px-2 py-1 hover:bg-white/10" href="#technology">
                Platform Overview
              </a>
              <a className="rounded px-2 py-1 hover:bg-white/10" href="#contact">
                Request Technical Briefing
              </a>
            </div>
          </div>
        </nav>

        <section className={`${microBorder} rounded-[1.12rem]`}>
          <div className="relative overflow-hidden rounded-[1.05rem] bg-white/90 p-8 backdrop-blur-xl md:p-12">
            <div className="pointer-events-none absolute inset-0 opacity-30 [background:linear-gradient(transparent_92%,rgba(191,219,254,0.16)_100%)] [background-size:100%_16px]" />
            <p className={`${monoFont.className} text-sm uppercase tracking-[0.32em] text-blue-700`}>PROBAVI</p>
            <h1
              className={`${headingFont.className} mt-5 whitespace-nowrap text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl`}
            >
              Absolute Finality for IT Audit
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
              Transforming audit-readiness from manual sampling to 100% automated verification.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-md border border-blue-700 bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(70,130,180,0.18)] transition duration-500 ease-out hover:bg-blue-600 hover:shadow-[0_0_26px_rgba(70,130,180,0.28)]"
              >
                Request Technical Briefing
              </a>
              <a
                href="#technology"
                className="rounded-md border border-blue-300 px-5 py-3 text-sm font-semibold text-blue-800 shadow-[0_0_14px_rgba(70,130,180,0.14)] transition duration-500 ease-out hover:border-blue-700 hover:text-blue-900 hover:shadow-[0_0_22px_rgba(70,130,180,0.22)]"
              >
                Platform Overview
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="space-y-7">
          <h2 className={`${headingFont.className} text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl`}>Leadership</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <article className={`${microBorder} rounded-[1.05rem]`}>
              <div className={`${panel} p-6 hover:outline hover:outline-1 hover:outline-blue-500/60`}>
                <div className="relative mb-5 h-52 overflow-hidden rounded-lg border border-blue-200/20 bg-blue-950/40">
                  <Image src="/leadership/quincy.png" alt="Portrait of Quincy Nolly" fill className="object-contain" />
                </div>
                <p className={`${monoFont.className} text-sm uppercase tracking-[0.2em] text-blue-700`}>Co-Founder</p>
                <h3 className={`${headingFont.className} mt-3 text-xl font-semibold text-slate-900`}>Quincy Nolly</h3>
                <p className="mt-2 text-sm text-slate-700">EMBA, Georgetown University</p>
                <a
                  className="mt-5 inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900"
                  href="mailto:qn11@georgetown.edu"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  qn11@georgetown.edu
                </a>
              </div>
            </article>
            <article className={`${microBorder} rounded-[1.05rem]`}>
              <div className={`${panel} p-6 hover:outline hover:outline-1 hover:outline-blue-500/60`}>
                <div className="relative mb-5 h-52 overflow-hidden rounded-lg border border-blue-200/20 bg-blue-950/40">
                  <Image src="/leadership/vishal.png" alt="Portrait of Vishal Sihag" fill className="object-contain" />
                </div>
                <p className={`${monoFont.className} text-sm uppercase tracking-[0.2em] text-blue-700`}>Co-Founder</p>
                <h3 className={`${headingFont.className} mt-3 text-xl font-semibold text-slate-900`}>Vishal Sihag</h3>
                <p className="mt-2 text-sm text-slate-700">MBA, Georgetown University</p>
                <a
                  className="mt-5 inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900"
                  href="mailto:vs740@georgetown.edu"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  vs740@georgetown.edu
                </a>
              </div>
            </article>
          </div>
        </section>

        <section id="technology" className="space-y-8">
          <h2 className={`${headingFont.className} text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl`}>The Technology: The Proof Engine</h2>
          <p className="max-w-4xl text-base leading-relaxed text-slate-700 md:text-lg">
            PROBAVI&apos;s Proof Engine pairs fine-tuned LLMs with deterministic mathematical rule engines so findings are explainable,
            reproducible, and grounded in machine-verifiable logic across entire environments.
          </p>
          <div className="grid gap-4 md:grid-cols-6">
            <article className={`${microBorder} rounded-[1.05rem] md:col-span-3 md:row-span-2`}>
              <div className={`${panel} h-full p-6 hover:outline hover:outline-1 hover:outline-blue-500/60`}>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-blue-500/25" />
                <div className="pointer-events-none absolute inset-3 rounded border border-blue-500/15 [clip-path:polygon(0_10px,10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)]" />
                <Sigma className="h-5 w-5 text-blue-700" aria-hidden="true" />
                <h3 className={`${headingFont.className} mt-3 text-lg font-semibold text-slate-900`}>100% Data Coverage</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Complete-system verification replaces selective sampling, reducing blind spots in evidence collection.
                </p>
              </div>
            </article>
            <article className={`${microBorder} rounded-[1.05rem] md:col-span-3`}>
              <div className={`${panel} h-full p-6 hover:outline hover:outline-1 hover:outline-blue-500/60`}>
                <Radar className="h-5 w-5 text-blue-700" aria-hidden="true" />
                <h3 className={`${headingFont.className} mt-3 text-lg font-semibold text-slate-900`}>Real-time Tracking</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Continuous validation keeps controls and exceptions visible as infrastructure changes.
                </p>
              </div>
            </article>
            <article className={`${microBorder} rounded-[1.05rem] md:col-span-3`}>
              <div className={`${panel} h-full p-6 hover:outline hover:outline-1 hover:outline-blue-500/60`}>
                <Fingerprint className="h-5 w-5 text-blue-700" aria-hidden="true" />
                <h3 className={`${headingFont.className} mt-3 text-lg font-semibold text-slate-900`}>Cryptographically Verifiable Proofs</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Tamper-resistant proofs provide a durable chain of trust for auditors and oversight teams.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="space-y-7">
          <h2 className={`${headingFont.className} text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl`}>Compliance Standards</h2>
          <div className="grid auto-rows-[minmax(112px,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["FASAB", "NIST", "FISCAM", "FedRAMP/IL4 Readiness"].map((standard) => (
              <div key={standard} className={`${microBorder} rounded-[0.9rem]`}>
                <div className={`${panel} flex h-full items-center gap-3 px-4 py-4 text-sm font-medium text-slate-800 hover:outline hover:outline-1 hover:outline-blue-500/60`}>
                  <ShieldCheck className="h-4 w-4 text-blue-700" aria-hidden="true" />
                  {standard}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative border-t border-blue-200/50 px-6 py-6 text-sm text-slate-700 md:px-10 lg:px-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-blue-700" aria-hidden="true" />
            PROBAVI — Built for IT Audit Finality.
          </p>
          <p>Proprietary technology.</p>
        </div>
      </footer>
    </div>
  );
}
