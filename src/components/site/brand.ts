export const BRAND = {
  name: "Rooftop",
  full: "Rooftop Restaurant & Lounge",
  parent: "K Hotels Entebbe",
  parentUrl: "https://www.khotels.ug",
  address: {
    line1: "6th Floor, K Hotels",
    line2: "Plot 32 Hill Rd, Entebbe, Uganda",
  },
  phones: ["+256 777 846 000", "+256 707 100 001"],
  emails: ["Info@khotels.ug", "fo.ebb@khotels.ug"],
  whatsapp: "256777846000",
  whatsappMessage:
    "Hi, I'd like to make a reservation at Rooftop Restaurant & Lounge.",
  hours: [
    { label: "Breakfast", value: "8:00 AM – 11:00 AM" },
    { label: "Lunch", value: "12:00 PM – 3:00 PM" },
    { label: "Dinner", value: "6:00 PM – Late" },
    { label: "Bar & Lounge", value: "All Day" },
    { label: "Rooftop Pool", value: "8:00 AM – 8:00 PM" },
  ],
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tripadvisor: "https://www.tripadvisor.com",
  },
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/experiences", label: "Experiences" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reservations", label: "Reservations" },
] as const;