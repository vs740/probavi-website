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

const steps = [
  {
    num: "01",
    title: "AI reads the evidence",
    body: "Evidence arrives as messy, manually uploaded files. The model extracts the facts (dates, IDs, statuses). Extraction only: it never decides pass or fail.",
  },
  {
    num: "02",
    title: "Code decides",
    body: "A deterministic rule engine applies the control logic in code and computes every count. Results are reproducible and explainable. They are never an LLM guess and never an invented number.",
  },
  {
    num: "03",
    title: "Drafts the report",
    body: "AI drafts an assessment report around the fixed numbers. Two code-side guards flag any figure the prose introduces that the numbers don't support.",
  },
];

const frameworks = [
  { name: "NIST 800-53", detail: "The control catalog" },
  { name: "RMF (800-37)", detail: "The process it runs in" },
  { name: "ATO", detail: "The authorization it supports" },
  { name: "FISMA", detail: "The law that requires it" },
];

const leaders = [
  {
    name: "Quincy Nolly",
    initials: "QN",
    role: "Co-Founder · IT audit",
    credential: "EMBA, Georgetown University",
    email: "qn11@georgetown.edu",
  },
  {
    name: "Vishal Sihag",
    initials: "VS",
    role: "Co-Founder · Product & build",
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
    <p className="text-sm font-semibold uppercase tracking-wide text-steel">
      {children}
    </p>
  );
}

// ---- panels ---------------------------------------------------------------

function OverviewPanel() {
  return (
    <div className="max-w-2xl">
      <Eyebrow>AI-powered · NIST 800-53 control assessment</Eyebrow>
      <h1 className="mt-5 font-heading text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight text-foreground">
        AI runs the control assessment. Code owns the numbers.
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        probavi AI takes a NIST 800-53 control from scoping to a signed assessment
        report. It reads the evidence, applies the rule, and drafts the write-up.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="bg-surface border border-border rounded-full px-3 py-1 text-sm text-steel">AI extracts the facts</span>
        <span className="text-muted" aria-hidden="true">→</span>
        <span className="bg-surface border border-border rounded-full px-3 py-1 text-sm text-muted">Code computes the numbers</span>
        <span className="text-muted" aria-hidden="true">→</span>
        <span className="bg-surface border border-border rounded-full px-3 py-1 text-sm text-steel">AI drafts the report</span>
      </div>
      <p className="mt-5 text-base leading-relaxed text-muted">
        Evidence comes in as messy, manually uploaded files. AI extracts the
        facts; code applies the control rule and computes every count; AI drafts
        the report around those fixed numbers and never invents one. It&apos;s
        built for the assessment teams and auditors who run RMF/ATO testing today
        in spreadsheets and email.
      </p>
      <p className="mt-5 text-base leading-relaxed text-muted">
        The live demo runs the flagship control (PS-5 / AC-2 access removal) on a
        sample of evidence.
      </p>
      <Link
        href="/assess"
        className="group mt-8 inline-flex items-center gap-2 border border-steel bg-steel px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#15304d]"
      >
        Open the live demo
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}

function HowPanel() {
  return (
    <div className="max-w-2xl">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground">
        AI reads, code decides, the report writes itself
      </h2>
      <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.num} className="bg-surface p-6">
            <span className="text-sm font-medium text-muted">{step.num}</span>
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-3 text-base leading-6 text-muted">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhoPanel() {
  return (
    <div className="max-w-2xl">
      <Eyebrow>Who it&apos;s for</Eyebrow>
      <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground">
        Built for RMF and the road to ATO
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
        probavi serves the people who test controls for an Authorization to
        Operate (ATO): an agency&apos;s security control assessors, ISSO/ISSM, and
        internal audit, plus the external auditors who support them. It replaces
        spreadsheet-and-email fieldwork with one place to run the assessment under
        the NIST Risk Management Framework.
      </p>
      <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {frameworks.map((framework) => (
          <div key={framework.name} className="bg-surface p-6">
            <ShieldCheck className="h-5 w-5 text-steel" aria-hidden="true" />
            <p className="mt-5 font-heading text-lg font-semibold tracking-tight text-foreground">
              {framework.name}
            </p>
            <p className="mt-1 text-sm text-muted">{framework.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPanel() {
  return (
    <div className="max-w-2xl">
      <Eyebrow>Team</Eyebrow>
      <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground">
        An IT-audit expert and a product builder
      </h2>
      <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
        {leaders.map((leader) => (
          <article key={leader.name} className="flex items-center gap-6 bg-surface p-6">
            <div
              aria-hidden="true"
              className="flex h-20 w-20 shrink-0 items-center justify-center border border-steel/30 bg-steel/5 font-heading text-lg font-semibold tracking-wide text-steel"
            >
              {leader.initials}
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-muted">
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
          <span className="font-heading text-lg font-semibold lowercase tracking-tight text-foreground">
            probavi AI
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
          <p className="text-sm font-medium text-muted">
            NIST 800-53 · RMF / ATO
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
