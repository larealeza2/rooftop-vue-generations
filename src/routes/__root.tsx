import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingActions } from "@/components/site/FloatingActions";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-night px-4 text-ivory">
      <div className="max-w-md text-center">
        <p className="eyebrow">Lost above the lake</p>
        <h1 className="mt-4 font-display text-7xl italic">404</h1>
        <p className="mt-3 text-base text-muted-foreground">
          This page drifted out to sea. Let's bring you back to shore.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1a1305] transition hover:bg-gold-hover"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-night px-4 text-ivory">
      <div className="max-w-md text-center">
        <p className="eyebrow">A moment, please</p>
        <h1 className="mt-3 font-display text-3xl italic">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Our team has been notified. Try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#1a1305] transition hover:bg-gold-hover"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-gold/50 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-ivory transition hover:bg-gold/10"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0D0A07" },
      { property: "og:site_name", content: "Rooftop Restaurant & Lounge" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital@0;1&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Rooftop Restaurant & Lounge",
          image: "/__l5e/og-rooftop.jpg",
          telephone: "+256777846000",
          email: "Info@khotels.ug",
          servesCuisine: ["Indian", "Continental", "East African", "Asian"],
          priceRange: "$$$",
          url: "/",
          address: {
            "@type": "PostalAddress",
            streetAddress: "6th Floor, K Hotels, Plot 32 Hill Rd",
            addressLocality: "Entebbe",
            addressCountry: "UG",
          },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "08:00", closes: "23:30" },
          ],
          parentOrganization: { "@type": "LodgingBusiness", name: "K Hotels Entebbe", url: "https://www.khotels.ug" },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-night text-ivory">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingActions />
    </QueryClientProvider>
  );
}
