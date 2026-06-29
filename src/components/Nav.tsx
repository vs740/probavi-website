import { ArrowRight } from "lucide-react";

const links = [
  { href: "#problem", label: "Problem" },
  { href: "#workflow", label: "How It Works" },
  { href: "#features", label: "Platform" },
  { href: "#compliance", label: "Compliance" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-10">
        <a
          href="#top"
          className="font-mono text-sm font-medium uppercase tracking-[0.32em] text-foreground"
        >
          PROBAVI
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 border border-steel bg-steel px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#15304d]"
        >
          Request Briefing
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
