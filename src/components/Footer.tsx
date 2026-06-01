import { BadgeCheck, ExternalLink } from "lucide-react";

const footerLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Trust Center / Security", href: "#trust" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d]">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.32em] text-slate-100">
              PROBAVI
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500">
              <BadgeCheck className="h-4 w-4 text-steel" aria-hidden="true" />
              Built for IT Audit Finality.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-slate-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.linkedin.com/company/probavi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-100"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-slate-800/80 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PROBAVI. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.18em]">Proprietary technology</p>
        </div>
      </div>
    </footer>
  );
}
