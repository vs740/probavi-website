import { Mail } from "lucide-react";

const leaders = [
  {
    name: "Quincy Nolly",
    initials: "QN",
    role: "Co-Founder",
    credential: "EMBA, Georgetown University",
    email: "qn11@georgetown.edu",
  },
  {
    name: "Vishal Sihag",
    initials: "VS",
    role: "Co-Founder",
    credential: "MBA, Georgetown University",
    email: "vs740@georgetown.edu",
  },
];

export default function Leadership() {
  return (
    <section id="contact" className="border-b border-slate-800/80">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-steel">
            Leadership
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            Built by operators in finance and compliance
          </h2>
        </div>
        <div className="mt-12 grid gap-px border border-slate-800 bg-slate-800 md:grid-cols-2">
          {leaders.map((leader) => (
            <article
              key={leader.name}
              className="flex items-center gap-6 bg-[#161616] p-8 transition-colors hover:bg-[#191919]"
            >
              <div
                aria-hidden="true"
                className="flex h-24 w-24 shrink-0 items-center justify-center border border-steel/40 bg-[linear-gradient(135deg,#1b1b1b,#101010)] font-heading text-2xl font-semibold tracking-wide text-steel"
              >
                {leader.initials}
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                  {leader.role}
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-slate-50">
                  {leader.name}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{leader.credential}</p>
                <a
                  href={`mailto:${leader.email}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-steel transition-colors hover:text-slate-100"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {leader.email}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
