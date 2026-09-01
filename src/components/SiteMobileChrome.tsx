"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  LayoutDashboard,
  Menu,
  PlayCircle,
  Users,
  Workflow,
  X,
} from "lucide-react";

export const siteNavItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "demo", label: "Demo", icon: PlayCircle, href: "/assess" as const },
  { id: "how", label: "How it works", icon: Workflow },
  { id: "who", label: "Who it's for", icon: Building2 },
  { id: "team", label: "Team", icon: Users },
];

const navItemClass =
  "flex min-h-11 items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors";

type SiteMobileHeaderProps = {
  onOpen: () => void;
};

export function SiteMobileHeader({ onOpen }: SiteMobileHeaderProps) {
  return (
    <header className="flex h-11 shrink-0 items-center gap-1 border-b border-border bg-surface px-2 md:hidden">
      <button
        type="button"
        onClick={onOpen}
        className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-background"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>
      <Link
        href="/"
        className="font-heading text-lg font-semibold lowercase tracking-tight text-foreground"
      >
        probavi
      </Link>
    </header>
  );
}

type SiteMobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  variant: "shell" | "assess";
  activeId?: string;
  onPanelSelect?: (id: string) => void;
};

export function SiteMobileDrawer({
  open,
  onClose,
  variant,
  activeId,
  onPanelSelect,
}: SiteMobileDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Site navigation">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close menu"
      />
      <aside className="drawer-panel absolute left-0 top-0 flex h-dvh w-72 max-w-[85vw] flex-col border-r border-border bg-surface shadow-xl">
        <div className="flex min-h-11 items-center justify-between border-b border-border px-3">
          <span className="font-heading text-lg font-semibold lowercase tracking-tight text-foreground">
            probavi
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-background"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          {siteNavItems.map((item) => {
            const Icon = item.icon;

            if (variant === "assess") {
              if (item.id === "overview") {
                return (
                  <Link
                    key={item.id}
                    href="/"
                    onClick={onClose}
                    className={`${navItemClass} text-muted hover:bg-background hover:text-foreground`}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              }
              if (item.href) {
                const isCurrent = item.id === "demo";
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onClose}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`${navItemClass} ${
                      isCurrent
                        ? "bg-steel text-white"
                        : "text-muted hover:bg-background hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={item.id}
                  href="/"
                  onClick={onClose}
                  className={`${navItemClass} text-muted hover:bg-background hover:text-foreground`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            }

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={`${navItemClass} text-muted hover:bg-background hover:text-foreground`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            }

            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onPanelSelect?.(item.id);
                  onClose();
                }}
                aria-current={isActive ? "page" : undefined}
                className={`${navItemClass} text-left ${
                  isActive
                    ? "bg-steel text-white"
                    : "text-muted hover:bg-background hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-6 py-5">
          <p className="text-sm font-medium text-muted">NIST 800-53 · RMF / ATO</p>
        </div>
      </aside>
    </div>
  );
}
