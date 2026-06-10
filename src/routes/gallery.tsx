import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import hero from "@/assets/hero-lake-sunset.jpg";
import about from "@/assets/about-rooftop-table.jpg";
import mongolian from "@/assets/exp-mongolian.jpg";
import sunset from "@/assets/exp-sunset.jpg";
import privateImg from "@/assets/exp-private.jpg";
import pool from "@/assets/pool-dusk.jpg";
import food1 from "@/assets/gal-food-1.jpg";
import food2 from "@/assets/gal-food-2.jpg";
import cocktail from "@/assets/gal-cocktail.jpg";
import view from "@/assets/gal-view.jpg";
import lounge from "@/assets/gal-lounge.jpg";
import menuFlat from "@/assets/menu-flatlay.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo Gallery | Rooftop Views & Fine Dining | K Hotels Entebbe Uganda" },
      { name: "description", content: "Browse photos of Rooftop Restaurant & Lounge at K Hotels Entebbe — Lake Victoria views, cuisine, events, pool and lounge." },
      { property: "og:title", content: "Gallery — Rooftop Restaurant & Lounge" },
      { property: "og:description", content: "Photos of our views, cuisine, events and rooftop lifestyle." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

type Cat = "all" | "views" | "food" | "events" | "lounge";
const PHOTOS: { src: string; alt: string; cat: Exclude<Cat, "all"> }[] = [
  { src: hero, alt: "Lake Victoria sunset rooftop view", cat: "views" },
  { src: food1, alt: "Butter chicken plated at Rooftop", cat: "food" },
  { src: view, alt: "Lake Victoria panorama at blue hour", cat: "views" },
  { src: mongolian, alt: "Mongolian Night live grill", cat: "events" },
  { src: about, alt: "Candlelit rooftop table at dusk", cat: "lounge" },
  { src: cocktail, alt: "Signature cocktail at Rooftop lounge", cat: "food" },
  { src: pool, alt: "Rooftop pool at dusk", cat: "lounge" },
  { src: privateImg, alt: "Private dining setup at Rooftop", cat: "events" },
  { src: food2, alt: "Grilled Lake Victoria tilapia", cat: "food" },
  { src: lounge, alt: "Rooftop lounge interior at night", cat: "lounge" },
  { src: menuFlat, alt: "Multi-cuisine signature dishes flat lay", cat: "food" },
  { src: sunset, alt: "Couple at sunset above Lake Victoria", cat: "events" },
];

function GalleryPage() {
  const [filter, setFilter] = useState<Cat>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const visible = PHOTOS.filter((p) => filter === "all" || p.cat === filter);

  const filters: { id: Cat; label: string }[] = [
    { id: "all", label: "All" },
    { id: "views", label: "Views" },
    { id: "food", label: "Food & Drink" },
    { id: "events", label: "Events" },
    { id: "lounge", label: "Pool & Lounge" },
  ];

  return (
    <>
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden pt-20">
        <img src={view} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-night/65" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow text-ivory/85">Gallery</p>
          <h1 className="mt-4 font-display text-5xl font-light italic text-ivory sm:text-7xl">
            A view worth <span className="text-gold">a thousand words</span>
          </h1>
        </div>
      </section>

      <section className="bg-night py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "px-5 py-2 text-[0.7rem] uppercase tracking-[0.2em] transition",
                  filter === f.id ? "bg-gold text-[#1a1305]" : "border border-gold/30 text-ivory/75 hover:border-gold",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mt-10 columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
            {visible.map((p, i) => (
              <button
                key={p.src + filter}
                onClick={() => setLightbox(i)}
                className="group block w-full overflow-hidden"
              >
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full transition duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-night/95 p-6" role="dialog" aria-modal="true">
          <button aria-label="Close" onClick={() => setLightbox(null)} className="absolute right-6 top-6 text-ivory">
            <X size={28} />
          </button>
          <button aria-label="Previous" onClick={() => setLightbox((i) => (i! - 1 + visible.length) % visible.length)} className="absolute left-4 text-ivory">
            <ChevronLeft size={36} />
          </button>
          <img src={visible[lightbox].src} alt={visible[lightbox].alt} className="max-h-[85vh] max-w-[90vw] object-contain" />
          <button aria-label="Next" onClick={() => setLightbox((i) => (i! + 1) % visible.length)} className="absolute right-4 text-ivory">
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </>
  );
}