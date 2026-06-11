import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import mongolianImg from "@/assets/exp-mongolian.jpg";
import sunsetImg from "@/assets/exp-sunset.jpg";
import privateImg from "@/assets/exp-private.jpg";
import poolImg from "@/assets/pool-dusk.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Dining Experiences & Events | Mongolian Night, Sunset Sessions | Rooftop Entebbe" },
      { name: "description", content: "Mongolian Night, Sunset Sessions and private rooftop hire at Rooftop Restaurant & Lounge, K Hotels Entebbe. Unforgettable evenings above Lake Victoria." },
      { property: "og:title", content: "Experiences & Events — Rooftop K Hotels" },
      { property: "og:description", content: "Themed dining, sunset sessions and private hire above Lake Victoria." },
      { property: "og:url", content: "/experiences" },
    ],
    links: [{ rel: "canonical", href: "/experiences" }],
  }),
  component: ExperiencesPage,
});

function Feature({ img, alt, tag, title, desc, cta, reverse, query }: {
  img: string; alt: string; tag: string; title: string; desc: string; cta: string; reverse?: boolean; query?: string;
}) {
  return (
    <section className="grain relative bg-night py-20 sm:py-28">
      <div className={`mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <img src={img} alt={alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        <div>
          <p className="eyebrow">{tag}</p>
          <h2 className="mt-4 font-display text-4xl font-light italic leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/75">{desc}</p>
          <Link
            to="/reservations"
            search={query ? { occasion: query } : undefined}
            className="mt-8 inline-flex items-center bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1305] transition hover:bg-gold-hover"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

function ExperiencesPage() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden pt-20">
        <img src={sunsetImg} alt="Sunset over Lake Victoria at Rooftop Restaurant" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-night/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow text-ivory/85">Experiences & Events</p>
          <h1 className="mt-4 font-display text-5xl font-light italic text-ivory sm:text-7xl">
            Moments made <span className="text-gold">unforgettable</span>
          </h1>
        </div>
      </section>

      <Feature
        img={mongolianImg}
        alt="Mongolian Night live grilling at Rooftop Restaurant K Hotels Entebbe"
        tag="Signature Themed Event"
        title="Mongolian Night — where fire meets flavour"
        desc="Pick your proteins, your sauces, your spice. Our chefs send them across a roaring open grill in a theatre of flames. Communal tables, live cooking, a soundtrack that builds as the evening deepens — Mongolian Night is dinner as performance."
        cta="Enquire About Mongolian Night"
        query="mongolian"
      />

      <Feature
        img={sunsetImg}
        alt="Couple enjoying cocktails at sunset overlooking Lake Victoria"
        tag="Signature Experience"
        title="Sunset Sessions — the lake at its most beautiful"
        desc="From 5:30PM the rooftop slows down. Cocktails are shaken with care, the playlist softens, and Lake Victoria turns to molten gold. Pull up a chair. The best seat in Entebbe is waiting."
        cta="Book a Sunset Table"
        reverse
        query="sunset"
      />

      <section className="relative overflow-hidden">
        <img src={privateImg} alt="Private dining setup at Rooftop K Hotels Entebbe" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-night/75" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-28 text-center">
          <p className="eyebrow text-gold">Exclusive Hire</p>
          <h2 className="mt-4 font-display text-4xl font-light italic text-ivory sm:text-6xl">
            The entire rooftop. <em className="text-gold not-italic font-light italic">Reserved for you.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-ivory/80">
            Birthdays, anniversaries, corporate dinners, proposals. Custom menus, dedicated staff, bespoke décor — subject to availability.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-ivory/80">
            <span className="border border-gold/40 px-4 py-2">Birthdays</span>
            <span className="border border-gold/40 px-4 py-2">Anniversaries</span>
            <span className="border border-gold/40 px-4 py-2">Corporate Dinners</span>
          </div>
          <Link
            to="/reservations"
            search={{ occasion: "private" }}
            className="mt-9 inline-flex items-center bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#1a1305] transition hover:bg-gold-hover"
          >
            Enquire About Private Hire
          </Link>
        </div>
      </section>

      <section className="bg-night py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <img src={poolImg} alt="Rooftop pool at dusk overlooking Lake Victoria" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <div>
            <SectionHeading align="left" eyebrow="Pool & Wellness" title={<>An afternoon <em className="text-gold italic font-light">above the lake</em></>} description="Glide through our rooftop pool, work out with the lake on the horizon, then unwind in the sauna and steam room. The full K Hotels wellness floor — yours to enjoy." />
            <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-ivory/85">
              <li className="border border-gold/20 p-4">Rooftop Swimming Pool</li>
              <li className="border border-gold/20 p-4">Fully Equipped Gym</li>
              <li className="border border-gold/20 p-4">Sauna</li>
              <li className="border border-gold/20 p-4">Steam Room</li>
            </ul>
            <p className="mt-6 text-[0.72rem] uppercase tracking-[0.2em] text-gold">Pool Hours · 8:00 AM – 8:00 PM daily</p>
          </div>
        </div>
      </section>

      <section className="bg-night-2 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Just Around the Corner" title={<>Perfectly located <em className="text-gold italic font-light">in Entebbe</em></>} />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              { name: "Victoria Mall", time: "5 minutes away" },
              { name: "Imperial Shopping Mall", time: "7 minutes away" },
              { name: "Lake Victoria Botanical Gardens", time: "Short drive away" },
            ].map((p) => (
              <div key={p.name} className="flex items-start gap-3 border border-gold/15 bg-night p-6">
                <MapPin className="mt-1 shrink-0 text-gold" size={20} />
                <div>
                  <p className="font-display text-xl italic">{p.name}</p>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-ivory/55">{p.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}