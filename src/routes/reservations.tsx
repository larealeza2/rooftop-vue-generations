import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail, Award, Check } from "lucide-react";
import privateImg from "@/assets/exp-private.jpg";
import { BRAND } from "@/components/site/brand";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({ occasion: z.string().optional() });

export const Route = createFileRoute("/reservations")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Reserve a Table | Rooftop Restaurant & Lounge | K Hotels Entebbe" },
      { name: "description", content: "Reserve your table at Rooftop Restaurant & Lounge above Lake Victoria. 6th Floor K Hotels Entebbe — multi-cuisine fine dining, sunset sessions, private hire." },
      { property: "og:title", content: "Reserve Your Rooftop Experience" },
      { property: "og:description", content: "Reserve a table above Lake Victoria at K Hotels Entebbe." },
      { property: "og:url", content: "/reservations" },
    ],
    links: [{ rel: "canonical", href: "/reservations" }],
  }),
  component: ReservationsPage,
});

const reservationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Please enter a phone number").max(30),
  date: z.string().min(1, "Choose a date"),
  time: z.string().min(1, "Choose a time"),
  guests: z.string().min(1),
  occasion: z.string().min(1),
  notes: z.string().max(500).optional(),
});

function ReservationsPage() {
  const search = Route.useSearch();
  const initialOccasion =
    search.occasion === "private"
      ? "Private Hire"
      : search.occasion === "mongolian"
        ? "Other"
        : search.occasion === "sunset"
          ? "General Dining"
          : "General Dining";

  const [submitted, setSubmitted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dateRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const el = document.querySelector<HTMLInputElement>('input[type="date"]');
    if (el) el.min = today;
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const parsed = reservationSchema.safeParse(data);

    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? "Please complete all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: insertError } = await supabase.from("reservations").insert([
        {
          guest_name: parsed.data.name,
          phone: parsed.data.phone,
          reservation_date: parsed.data.date,
          reservation_time: parsed.data.time,
          party_size: Number(parsed.data.guests),
          occasion: parsed.data.occasion,
          notes: parsed.data.notes ?? null,
          status: "pending",
        },
      ]);

      if (insertError) {
        console.error("Supabase error:", insertError);
        setSubmitError("Failed to submit reservation. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSubmitted(parsed.data.name);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="relative h-[45vh] min-h-[340px] overflow-hidden pt-20">
        <img src={privateImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-night/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="glass mb-5 inline-flex items-center gap-2 px-4 py-2 text-[0.65rem] uppercase tracking-[0.22em] text-ivory">
            <Award size={14} className="text-gold" /> #1 Hotel in Entebbe · TripAdvisor
          </div>
          <h1 className="font-display text-5xl font-light italic text-ivory sm:text-7xl">
            Reserve your <span className="text-gold">rooftop experience</span>
          </h1>
        </div>
      </section>

      <section className="bg-night py-20">
        <div className="mx-auto max-w-3xl px-6">
          {submitted ? (
            <div className="border border-gold/40 bg-night-2 p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-[#1a1305]">
                <Check size={28} />
              </div>
              <h2 className="mt-6 font-display text-3xl italic text-gold">Thank you, {submitted}</h2>
              <p className="mt-3 text-ivory/80">
                Your reservation request has been received. Our team typically confirms within 2 hours during operating hours.
              </p>
              <p className="mt-6 text-[0.7rem] uppercase tracking-[0.2em] text-ivory/55">
                Prefer to call? {BRAND.phones[0]}
              </p>
            </div>
          ) : (
            <>
              <p className="text-center text-ivory/75">
                Complete the form below and our team will confirm your reservation within 24 hours.
              </p>
              <form onSubmit={onSubmit} className="mt-10 space-y-6">
                <Field label="Full Name" name="name" required type="text" />
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Phone Number" name="phone" required type="tel" defaultValue="+256 " />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Preferred Date" name="date" required type="date" />
                  <Select label="Preferred Time" name="time" options={[
                    "Breakfast (8–11AM)",
                    "Lunch (12–3PM)",
                    "Dinner (6PM–Late)",
                    "Bar & Lounge (All Day)",
                  ]} />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Number of Guests" name="guests" required type="number" min={1} max={80} defaultValue={2} />
                  <Select label="Occasion" name="occasion" defaultValue={initialOccasion} options={[
                    "General Dining",
                    "Birthday",
                    "Anniversary",
                    "Business Dinner",
                    "Private Hire",
                    "Other",
                  ]} />
                </div>
                <Textarea label="Special Requests" name="notes" placeholder="Dietary requirements, décor preferences, accessibility needs..." />

                {error && <p className="text-sm text-red-400">{error}</p>}
                {submitError && <p className="text-sm text-red-400">{submitError}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#1a1305] transition hover:bg-gold-hover active:bg-gold-press disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Confirm My Reservation"}
                </button>
                <p className="text-center text-[0.7rem] uppercase tracking-[0.2em] text-ivory/55">
                  Prefer to call? {BRAND.phones[0]} · {BRAND.phones[1]}
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      <section className="bg-night-2 py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-3">
          <Card icon={MapPin} title="Find Us" lines={[BRAND.address.line1, BRAND.address.line2]} />
          <Card icon={Phone} title="Call Us" lines={BRAND.phones} hrefs={BRAND.phones.map((p) => `tel:${p.replace(/\s/g, "")}` )} />
          <Card icon={Mail} title="Email Us" lines={BRAND.emails} hrefs={BRAND.emails.map((e) => `mailto:${e}`)} />
        </div>
      </section>

      <section className="bg-night pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="aspect-[16/8] w-full overflow-hidden border border-gold/15">
            <iframe
              title="K Hotels Entebbe location map"
              src="https://www.google.com/maps?q=Plot+32+Hill+Rd,+Entebbe,+Uganda&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
              style={{ filter: "grayscale(0.4) contrast(1.05) brightness(0.85)" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-[0.7rem] uppercase tracking-[0.22em] text-ivory/70">{label}</span>
      <input
        name={name}
        {...rest}
        className="mt-2 w-full border border-gold/25 bg-night-2 px-4 py-3 text-base text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
      />
    </label>
  );
}

function Select({ label, name, options, defaultValue }: { label: string; name: string; options: string[]; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="block text-[0.7rem] uppercase tracking-[0.22em] text-ivory/70">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        required
        className="mt-2 w-full border border-gold/25 bg-night-2 px-4 py-3 text-base text-ivory focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
      >
        <option value="">Select an option</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-[0.7rem] uppercase tracking-[0.22em] text-ivory/70">{label}</span>
      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        className="mt-2 w-full border border-gold/25 bg-night-2 px-4 py-3 text-base text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
      />
    </label>
  );
}

function Card({ icon: Icon, title, lines, hrefs }: { icon: typeof MapPin; title: string; lines: string[]; hrefs?: string[] }) {
  return (
    <div className="border border-gold/20 bg-night p-7 text-center">
      <Icon className="mx-auto text-gold" size={26} />
      <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-gold">{title}</p>
      <div className="mt-4 space-y-1 text-sm text-ivory/85">
        {lines.map((l, i) =>
          hrefs?.[i] ? (
            <a key={l} href={hrefs[i]} className="block hover:text-gold">{l}</a>
          ) : (
            <p key={l}>{l}</p>
          ),
        )}
      </div>
    </div>
  );
}
