import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "./brand";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-night/90 backdrop-blur-md border-b border-gold/15 py-3"
          : "bg-transparent py-5",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-display text-2xl font-light italic text-gold">
            Rooftop
          </span>
          <span className="mt-0.5 text-[0.6rem] tracking-[0.3em] text-ivory/70">
            AT K HOTELS · ENTEBBE
          </span>
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-active={active}
                  className="link-underline text-[0.78rem] uppercase tracking-[0.22em] text-ivory/85 transition hover:text-gold data-[active=true]:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/reservations"
            className={cn(
              "inline-flex items-center px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-all",
              scrolled
                ? "bg-gold text-[#1a1305] hover:bg-gold-hover"
                : "border border-gold text-gold hover:bg-gold hover:text-[#1a1305]",
            )}
          >
            Reserve a Table
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-ivory"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 flex flex-col bg-night transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-20 items-center justify-between px-5">
          <span className="font-display text-xl italic text-gold">Rooftop</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-ivory"
          >
            <X size={26} />
          </button>
        </div>
        <ul className="flex flex-1 flex-col items-center justify-center gap-7">
          {NAV_LINKS.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-active={active}
                  className="font-display text-4xl italic text-ivory transition data-[active=true]:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-4">
            <Link
              to="/reservations"
              className="inline-flex items-center bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1305]"
            >
              Reserve a Table
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}