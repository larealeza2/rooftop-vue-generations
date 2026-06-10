import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { BRAND, NAV_LINKS } from "./brand";

export function SiteFooter() {
  return (
    <footer className="grain relative border-t border-gold/15 bg-night-2 text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl italic text-gold">Rooftop</p>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.3em] text-ivory/60">
            Above Lake Victoria · Entebbe
          </p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/75">
            A multi-cuisine fine dining destination on the 6th floor of K Hotels — Uganda's home above the lake.
          </p>
          <div className="mt-7 flex gap-4">
            <a aria-label="Instagram" href={BRAND.social.instagram} target="_blank" rel="noreferrer" className="text-gold transition hover:text-gold-hover">
              <Instagram size={20} />
            </a>
            <a aria-label="Facebook" href={BRAND.social.facebook} target="_blank" rel="noreferrer" className="text-gold transition hover:text-gold-hover">
              <Facebook size={20} />
            </a>
            <a aria-label="TripAdvisor" href={BRAND.social.tripadvisor} target="_blank" rel="noreferrer" className="text-xs font-semibold uppercase tracking-[0.2em] text-gold transition hover:text-gold-hover">
              TripAdvisor
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-ivory/85">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={BRAND.parentUrl} target="_blank" rel="noreferrer" className="transition hover:text-gold">
                K Hotels
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Hours</p>
          <ul className="mt-5 space-y-2.5 text-sm text-ivory/85">
            {BRAND.hours.map((h) => (
              <li key={h.label} className="flex justify-between gap-3">
                <span className="text-ivory/65">{h.label}</span>
                <span>{h.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Contact</p>
          <address className="mt-5 space-y-4 not-italic text-sm text-ivory/85">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-gold" size={16} />
              <span>
                {BRAND.address.line1}
                <br />
                {BRAND.address.line2}
              </span>
            </p>
            <p className="flex flex-col gap-1">
              {BRAND.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-3 transition hover:text-gold">
                  <Phone className="text-gold" size={16} /> {p}
                </a>
              ))}
            </p>
            <p className="flex flex-col gap-1">
              {BRAND.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="flex items-center gap-3 transition hover:text-gold">
                  <Mail className="text-gold" size={16} /> {e}
                </a>
              ))}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-gold/10 px-6 py-6 text-center text-[0.7rem] uppercase tracking-[0.22em] text-ivory/55">
        © {new Date().getFullYear()} Rooftop Restaurant & Lounge · K Hotels Entebbe · Part of K Hotels Uganda ·{" "}
        <a href={BRAND.parentUrl} target="_blank" rel="noreferrer" className="text-gold hover:text-gold-hover">
          www.khotels.ug
        </a>
      </div>
    </footer>
  );
}