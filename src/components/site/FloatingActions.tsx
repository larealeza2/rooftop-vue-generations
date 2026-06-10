import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { BRAND } from "./brand";

export function FloatingActions() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onReservations = pathname.startsWith("/reservations");

  const waHref = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    BRAND.whatsappMessage,
  )}`;

  return (
    <>
      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition hover:scale-105"
      >
        <MessageCircle size={26} />
      </a>

      {!onReservations && (
        <Link
          to="/reservations"
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1305] shadow-xl shadow-black/40 transition hover:bg-gold-hover lg:hidden"
        >
          Reserve a Table
        </Link>
      )}
    </>
  );
}