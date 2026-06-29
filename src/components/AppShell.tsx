"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  LayoutDashboard,
  Mail,
  PlayCircle,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

// ---- data reused/condensed from the old stacked components ----------------
const stats = [
  { k: "Coverage", v: "100%" },
  { k: "Controls", v: "1,284" },
  { k: "Exceptions", v: "0" },
];

const steps = [
  {
    num: "01",
    title: "AI reads the evidence",
    body: "Fine-tuned LLMs extract the facts — dates, IDs, statuses — from messy, inconsistent audit evidence. Extraction only: the model never decides pass or fail.",
  },
  {
    num: "02",
    title: "Code decides",
    body: "A deterministic rule engine applies the control logic in code. Findings are reproducible and explainable — never an LLM guess, never invented numbers.",
  },
  {
    num: "03",
    title: "Drafts the report",
    body: "Generates an auditor-ready Security Assessment Report: numbers come from code, prose from AI, with integrity guards that flag any unsanctioned figure.",
  },
];

const frameworks = [
  { name: "FASAB", detail: "Federal accounting standards" },
  { name: "NIST 800-53", detail: "Control families" },
  { name: "FISCAM", detail: "Federal information systems" },
  { name: "FedRAMP / IL4", detail: "Authorization readiness" },
];

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

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "demo", label: "Demo", href: "/assess", icon: PlayCircle },
  { id: "how", label: "How it works", icon: Workflow },
  { id: "who", label: "Who it's for", icon: Building2 },
  { id: "team", label: "Team", icon: Users },
];

// ---- small shared bits ----------------------------------------------------
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.28em] text-steel">{children}</p>
  );
}

// ---- panels ---------------------------------------------------------------
function OverviewPanel() {
  return (
    <div className="max-w-2xl">
      <p className="inline-flex items-center gap-2 border border-border bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-[0.22em] text-steel">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
        DoD 2028 Audit Mandate Ready
      </p>
      <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-foreground lg:text-5xl">
        Absolute Finality for IT Audit
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        Transforming audit-readiness from manual sampling to 100% automated verification.
      </p>
      <p className="mt-5 leading-relaxed text-muted">
        PROBAVI pairs fine-tuned LLMs with deterministic rule engines to turn messy audit
        evidence into cryptographically verifiable, auditor-ready proof. Traditional audits
        rely on manual, point-in-time sampling — leaving blind spots and risking compliance
        failures. PROBAVI is built for federal agencies and the auditors who serve them.
      </p>

      <div className="mt-8 grid max-w-md grid-cols-3 divide-x divide-border border border-border bg-surface">
        {stats.map((stat) => (
          <div key={stat.k} className="px-4 py-4">
            <p className="font-heading text-xl font-semibold text-foreground">{stat.v}</p>
            <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              {stat.k}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/assess"
        className="group mt-8 inline-flex items-center gap-2 border border-steel bg-steel px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#15304d]"
      >
        Open the live demo
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

function HowPanel() {
  return (
    <div className="max-w-3xl">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
        From integration to immutable proof
      </h2>
      <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.num} className="bg-surface p-6">
            <span className="font-mono text-sm text-muted">{step.num}</span>
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhoPanel() {
  return (
    <div className="max-w-3xl">
      <Eyebrow>Who it&apos;s for</Eyebrow>
      <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
        Built for federal audit and ATO
      </h2>
      <p className="mt-5 max-w-2xl leading-relaxed text-muted">
        PROBAVI serves government agencies and their auditors pursuing Authorization to
        Operate (ATO) under the NIST Risk Management Framework (RMF) — replacing sampled
        spot-checks with continuous, full-population assurance mapped to the standards
        auditors require.
      </p>
      <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {frameworks.map((framework) => (
          <div key={framework.name} className="bg-surface p-6">
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
  );
}

function TeamPanel() {
  return (
    <div className="max-w-3xl">
      <Eyebrow>Team</Eyebrow>
      <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
        Built by operators in finance and compliance
      </h2>
      <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
        {leaders.map((leader) => (
          <article key={leader.name} className="flex items-center gap-6 bg-surface p-6">
            <div
              aria-hidden="true"
              className="flex h-20 w-20 shrink-0 items-center justify-center border border-steel/30 bg-steel/5 font-heading text-xl font-semibold tracking-wide text-steel"
            >
              {leader.initials}
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {leader.role}
              </p>
              <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">
                {leader.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{leader.credential}</p>
              <a
                href={`mailto:${leader.email}`}
                className="mt-3 inline-flex items-center gap-2 text-sm text-steel transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {leader.email}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

const panels: Record<string, React.ReactNode> = {
  overview: <OverviewPanel />,
  how: <HowPanel />,
  who: <WhoPanel />,
  team: <TeamPanel />,
};

export default function AppShell() {
  const [active, setActive] = useState("overview");

  return (
    <div className="flex h-screen overflow-hidden bg-background text-muted">
      {/* Fixed left rail */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-surface">
        <div className="px-6 py-6">
          <span className="font-mono text-base font-medium lowercase tracking-[0.32em] text-foreground">
            probavi
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const base =
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors";

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`${base} text-muted hover:bg-background hover:text-foreground`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            }

            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`${base} text-left ${
                  isActive
                    ? "bg-steel text-white"
                    : "text-muted hover:bg-background hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-6 py-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            Built for IT Audit Finality
          </p>
        </div>
      </aside>

      {/* Center content panel — only one visible at a time */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full max-w-4xl items-center px-8 py-10 md:px-14">
          {panels[active]}
        </div>
      </main>
    </div>
  );
}
