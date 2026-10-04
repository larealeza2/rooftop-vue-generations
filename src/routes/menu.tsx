import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import menuHero from "@/assets/menu-flatlay.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Restaurant Menu | Indian, Continental & East African Cuisine | Rooftop K Hotels" },
      { name: "description", content: "Explore our multi-cuisine menu — Indian, Continental, East African, Asian, fast food and desserts. Rooftop Restaurant & Lounge at K Hotels Entebbe." },
      { property: "og:title", content: "Menu — Rooftop Restaurant & Lounge" },
      { property: "og:description", content: "Multi-cuisine fine dining above Lake Victoria." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

type MenuItem = Tables<"menu_items">;
type Section = { title: string; items: MenuItem[] };
type Period = { id: string; label: string; sections: Section[] };

function MenuPage() {
  const [menuData, setMenuData] = useState<Period[]>([]);
  const [active, setActive] = useState<string>("all-day");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        setLoading(true);
        const { data, error: queryError } = await supabase
          .from("menu_items")
          .select("id, name, category, description, price, available")
          .eq("available", true)
          .order("category")
          .order("name");

        if (queryError) {
          console.error("Supabase error:", queryError);
          setError("Failed to load menu items");
          setLoading(false);
          return;
        }

        if (!data || data.length === 0) {
          setError("No menu items available");
          setLoading(false);
          return;
        }

        // Group items by category
        const groupedByCategory = data.reduce(
          (acc, item) => {
            const category = item.category || "Other";
            if (!acc[category]) acc[category] = [];
            acc[category].push(item);
            return acc;
          },
          {} as Record<string, MenuItem[]>
        );

        // Create menu periods
        const periods: Period[] = [
          {
            id: "all-day",
            label: "All-Day Menu",
            sections: Object.entries(groupedByCategory).map(([categoryName, items]) => ({
              title: categoryName,
              items,
            })),
          },
        ];

        setMenuData(periods);
        setActive(periods[0]?.id || "all-day");
      } catch (err) {
        console.error("Menu fetch error:", err);
        setError("An error occurred while loading the menu");
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItems();
  }, []);

  const current = menuData.find((p) => p.id === active) ?? menuData[0];

  if (error && !loading) {
    return (
      <>
        <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden pt-20">
          <img src={menuHero} alt="Overhead flat lay of signature dishes at Rooftop Restaurant K Hotels Entebbe" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-night/65" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="eyebrow text-ivory/85">The Menu</p>
            <h1 className="mt-4 font-display text-5xl font-light italic text-ivory sm:text-7xl">
              Every cuisine. <span className="text-gold">One rooftop.</span>
            </h1>
            <p className="mt-4 text-sm uppercase tracking-[0.22em] text-ivory/75">
              Indian · Continental · East African · Asian · Fast Food · Desserts
            </p>
          </div>
        </section>
        <section className="bg-night py-20">
          <div className="mx-auto max-w-4xl px-6 text-center text-red-400">
            <p>{error}</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden pt-20">
        <img src={menuHero} alt="Overhead flat lay of signature dishes at Rooftop Restaurant K Hotels Entebbe" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-night/65" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow text-ivory/85">The Menu</p>
          <h1 className="mt-4 font-display text-5xl font-light italic text-ivory sm:text-7xl">
            Every cuisine. <span className="text-gold">One rooftop.</span>
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.22em] text-ivory/75">
            Indian · Continental · East African · Asian · Fast Food · Desserts
          </p>
        </div>
      </section>

      {loading ? (
        <div className="bg-night py-20">
          <div className="mx-auto max-w-4xl px-6 text-center text-ivory/70">
            <p>Loading menu items...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="sticky top-[68px] z-30 border-y border-gold/15 bg-night/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:gap-6 sm:px-8">
              {menuData.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] transition",
                    active === p.id ? "border-b border-gold text-gold" : "text-ivory/65 hover:text-ivory",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <section className="bg-night py-20">
            <div className="mx-auto max-w-4xl px-6 space-y-16">
              {current?.sections.map((s) => (
                <div key={s.title}>
                  <h2 className="font-display text-3xl italic text-gold">{s.title}</h2>
                  <div className="mt-2 h-px w-16 bg-gold/60" />
                  <ul className="mt-8 space-y-7">
                    {s.items.map((item) => (
                      <li key={item.id}>
                        <div className="flex items-baseline gap-4">
                          <h3 className="font-display text-2xl text-ivory">{item.name}</h3>
                          <div className="flex-1 border-b border-dashed border-gold/25" />
                          <span className="font-display text-lg text-gold">UGX {item.price?.toLocaleString()}</span>
                        </div>
                        <p className="mt-2 max-w-3xl text-sm text-ivory/70">
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <section className="bg-gold py-16 text-[#1a1305]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.22em]">Tonight, perhaps</p>
            <p className="mt-2 font-display text-3xl italic sm:text-4xl">
              Ready to experience these flavours in person?
            </p>
          </div>
          <Link
            to="/reservations"
            className="inline-flex items-center bg-[#1a1305] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold transition hover:bg-night"
          >
            Reserve Your Table
          </Link>
        </div>
      </section>
    </>
  );
}
