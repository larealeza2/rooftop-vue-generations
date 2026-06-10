import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Clock,
  MapPin,
  Phone,
  Star,
  ChevronDown,
  Waves,
  Dumbbell,
  Flame,
  Droplets,
  Utensils,
  Sunset,
  Wine,
  Award,
  ArrowRight,
} from "lucide-react";
import heroImg from "@/assets/hero-lake-sunset.jpg";
import aboutImg from "@/assets/about-rooftop-table.jpg";
import mongolianImg from "@/assets/exp-mongolian.jpg";
import sunsetImg from "@/assets/exp-sunset.jpg";
import privateImg from "@/assets/exp-private.jpg";
import galFood1 from "@/assets/gal-food-1.jpg";
import galFood2 from "@/assets/gal-food-2.jpg";
import galCocktail from "@/assets/gal-cocktail.jpg";
import galView from "@/assets/gal-view.jpg";
import galLounge from "@/assets/gal-lounge.jpg";
import poolImg from "@/assets/pool-dusk.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rooftop Restaurant & Lounge | Fine Dining Above Lake Victoria | K Hotels Entebbe" },
      {
        name: "description",
        content:
          "Dine above Lake Victoria at Rooftop Restaurant & Lounge, 6th Floor K Hotels Entebbe. Multi-cuisine fine dining, cocktail lounge, themed events & breathtaking views. TripAdvisor #1 in Entebbe.",
      },
      { property: "og:title", content: "Rooftop Restaurant & Lounge | Above Lake Victoria" },
      {
        property: "og:description",
        content:
          "Multi-cuisine fine dining, cocktail lounge and rooftop pool above Lake Victoria. K Hotels Entebbe — TripAdvisor #1.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const CUISINES = [
  { icon: Utensils, name: "Indian", desc: "Slow-spiced classics" },
  { icon: Wine, name: "Continental", desc: "European refinement" },
  { icon: Flame, name: "East African", desc: "Lake-to-table heritage" },
  { icon: Star, name: "Asian", desc: "Wok-fired traditions" },
  { icon: Sunset, name: "Fast Food", desc: "Effortless favourites" },
  { icon: Award, name: "Desserts", desc: "Pastry & patisserie" },
];

const REVIEWS = [
  {
    quote:
      "The food was on point and the rooftop terrace had the most beautiful view. The staff are friendly and welcoming. It's a home away from home.",
    name: "Sarah M.",
    source: "TripAdvisor",
  },
  {
    quote:
      "Take a seat at the rooftop lounge with a breathtaking view of Lake Victoria. Absolutely stunning.",
    name: "James T.",
    source: "Google",
  },
  {
    quote:
      "Rooftop restaurant experience amazing — all the staff were helpful and courteous. Felt like a five-star hotel.",
    name: "Priya K.",
    source: "TripAdvisor",
  },
];

function Home() {
  return (
    <>
      <Hero />
      <QuickInfoBar />
      <AboutSection />
      <CuisineSection />
      <ExperiencesSection />
      <ReviewsSection />
      <AmenitiesSection />
      <InstagramStrip />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Lake Victoria sunset view from Rooftop Restaurant & Lounge at K Hotels Entebbe, Uganda"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/55 via-night/30 to-night/85" />
      <div className="grain absolute inset-0" />

      {/* TripAdvisor badge */}
      <div className="absolute right-5 top-24 z-10 hidden md:block">
        <div className="glass flex items-center gap-2 px-4 py-2 text-[0.65rem] uppercase tracking-[0.22em] text-ivory">
          <Award size={14} className="text-gold" />
          #1 Hotel in Entebbe · TripAdvisor
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow mb-6 text-ivory/85">
          Rooftop Restaurant & Lounge · 6th Floor · Entebbe
        </p>
        <h1 className="max-w-5xl font-display text-[clamp(3rem,9vw,7rem)] font-light italic leading-[0.95] text-ivory">
          Above the Lake.
          <br />
          <span className="text-gold">Beyond Ordinary.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-ivory/80 sm:text-lg">
          A multi-cuisine dining destination perched six floors above Lake Victoria —
          where the horizon meets your table.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            to="/reservations"
            className="inline-flex items-center justify-center bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#1a1305] transition hover:bg-gold-hover"
          >
            Reserve Your Table
          </Link>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center border border-gold/70 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ivory transition hover:bg-gold hover:text-[#1a1305]"
          >
            Explore the Menu
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ivory/70">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="animate-bounce" size={18} />
        </div>
      </div>
    </section>
  );
}

function QuickInfoBar() {
  const items = [
    {
      icon: Clock,
      title: "Open Today",
      lines: ["Breakfast 8–11 · Lunch 12–3 · Dinner 6–Late"],
    },
    {
      icon: MapPin,
      title: "Find Us",
      lines: ["6th Floor, K Hotels · Plot 32 Hill Rd, Entebbe"],
    },
    {
      icon: Phone,
      title: "Reservations",
      lines: ["+256 777 846 000 · Info@khotels.ug"],
    },
  ];
  return (
    <section className="border-y border-gold/10 bg-twilight">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-3 md:gap-6 md:py-7">
        {items.map((i) => (
          <div key={i.title} className="flex items-start gap-4">
            <i.icon className="mt-1 shrink-0 text-gold" size={22} />
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold/80">
                {i.title}
              </p>
              <p className="mt-1 text-sm text-ivory/90">{i.lines[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="grain relative bg-night py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <img
            src={aboutImg}
            alt="Candlelit rooftop table overlooking Lake Victoria at dusk, Rooftop Restaurant & Lounge K Hotels Entebbe"
            className="aspect-[4/5] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 border border-gold/40 md:block" />
        </div>
        <div>
          <SectionHeading
            align="left"
            eyebrow="Above the Lake"
            title={
              <>
                A dining experience
                <br />
                <span className="text-gold italic">above Lake Victoria</span>
              </>
            }
            description="Six floors up, the horizon stretches in every direction. Multi-cuisine kitchens send aromas into the open air, candlelight catches the brass of a cocktail shaker, and a warm Ugandan welcome makes the rooftop feel — quite simply — like home above the lake."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Multi-Cuisine Kitchen" },
              { label: "Lake Victoria Views" },
              { label: "Cocktail Lounge" },
              { label: "TripAdvisor #1" },
            ].map((b) => (
              <div
                key={b.label}
                className="border border-gold/20 p-4 text-center text-[0.7rem] uppercase tracking-[0.18em] text-ivory/85"
              >
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CuisineSection() {
  return (
    <section className="bg-ivory py-24 text-[#1a1305] sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="The Kitchen"
          title={
            <span className="text-[#1a1305]">
              A world of flavour, <em className="text-terracotta not-italic font-light italic">one rooftop</em>
            </span>
          }
          description={
            <span className="text-[#1a1305]/75">
              From the Indian tandoor to the East African grill, every kitchen speaks its own dialect of fine dining.
            </span>
          }
        />
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {CUISINES.map((c) => (
            <div
              key={c.name}
              className="group flex flex-col items-center gap-3 border border-[#1a1305]/10 bg-parchment/40 p-6 text-center transition hover:-translate-y-1 hover:border-gold hover:shadow-[0_10px_40px_-15px_rgba(201,147,42,0.45)]"
            >
              <c.icon className="text-terracotta transition group-hover:text-gold" size={28} />
              <p className="font-display text-xl italic transition group-hover:text-gold">{c.name}</p>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[#1a1305]/60">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperiencesSection() {
  const cards = [
    {
      img: mongolianImg,
      tag: "Themed Dining Event",
      title: "The night the grill takes centre stage",
      desc: "Mongolian Night — sizzling flames, communal tables, an evening of pure theatre.",
      cta: "Discover Mongolian Night",
    },
    {
      img: sunsetImg,
      tag: "Signature Experience",
      title: "Watch the sun sink into Lake Victoria",
      desc: "Sunset Sessions — handcrafted cocktails as the sky turns amber.",
      cta: "Book a Sunset Table",
    },
    {
      img: privateImg,
      tag: "Exclusive Hire",
      title: "The entire rooftop. Just for you.",
      desc: "Birthdays · Anniversaries · Corporate dinners — bespoke menus, dedicated staff.",
      cta: "Enquire About Private Hire",
    },
  ];

  return (
    <section className="grain relative bg-night py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Experiences"
          title={
            <>
              Extraordinary evenings <em className="text-gold not-italic font-light italic">await</em>
            </>
          }
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group relative aspect-[3/4] overflow-hidden bg-night-2"
            >
              <img
                src={c.img}
                alt={c.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/10" />
              <div className="absolute left-5 top-5 z-10 bg-gold px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#1a1305]">
                {c.tag}
              </div>
              <div className="absolute inset-x-5 bottom-6 z-10 text-ivory">
                <h3 className="font-display text-2xl italic leading-tight">{c.title}</h3>
                <p className="mt-2 text-sm text-ivory/80">{c.desc}</p>
                <Link
                  to="/experiences"
                  className="mt-4 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold transition hover:gap-3"
                >
                  {c.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-night-2 py-24 sm:py-32">
      <div className="absolute inset-0 opacity-25" style={{
        backgroundImage: "radial-gradient(circle at 20% 30%, rgba(201,147,42,0.25), transparent 40%), radial-gradient(circle at 80% 70%, rgba(196,113,74,0.18), transparent 40%)",
      }} />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="eyebrow">Guest Voices</span>
          <p className="font-display text-2xl italic text-gold">#1 Rated Hotel in Entebbe · TripAdvisor</p>
        </div>

        <div className="mt-12 min-h-[200px]">
          {REVIEWS.map((r, i) => (
            <blockquote
              key={r.name}
              className={`transition-opacity duration-700 ${i === idx ? "opacity-100" : "pointer-events-none absolute inset-0 px-6 opacity-0"}`}
            >
              <div className="flex justify-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-6 font-script text-2xl italic leading-relaxed text-ivory sm:text-3xl">
                "{r.quote}"
              </p>
              <footer className="mt-6 text-[0.75rem] uppercase tracking-[0.22em] text-ivory/65">
                {r.name} · {r.source}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              aria-label={`Review ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-1.5 transition-all ${i === idx ? "w-8 bg-gold" : "w-4 bg-ivory/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AmenitiesSection() {
  const items = [
    { icon: Waves, title: "Rooftop Pool", note: "Open 8AM – 8PM" },
    { icon: Dumbbell, title: "Gym", note: "Available daily" },
    { icon: Flame, title: "Sauna", note: "Full relaxation" },
    { icon: Droplets, title: "Steam Room", note: "Open daily" },
  ];
  return (
    <section className="grain relative bg-night py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Above & Beyond" title={<>More than <em className="text-gold italic font-light">a restaurant</em></>} />
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.title} className="flex flex-col items-center gap-3 border border-gold/15 bg-night-2 p-8 text-center transition hover:border-gold/40">
              <i.icon size={30} className="text-gold" />
              <p className="font-display text-xl italic">{i.title}</p>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory/55">{i.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramStrip() {
  const imgs = [galView, galFood1, poolImg, galCocktail, galLounge, galFood2];
  return (
    <section className="bg-night-2 py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="eyebrow">Follow the view</p>
        <h2 className="mt-3 font-display text-3xl italic">@RooftopKHotels</h2>
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {imgs.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden"
              aria-label="View on Instagram"
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-night/0 transition group-hover:bg-night/60" />
            </a>
          ))}
        </div>
        <div className="mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center border border-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-[#1a1305]"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
