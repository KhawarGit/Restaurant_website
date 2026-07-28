// Central source of truth for restaurant info (KK Grove — a hypothetical
// tropical-luxury restaurant, modelled on a Karachi fine-dining venue).
export const site = {
  name: "KK Grove",
  tagline: "Where luxury meets great views & unforgettable food.",
  description:
    "A tropical-luxury dining escape in the heart of Karachi — BBQ, Pakistani & Continental cuisine crafted by master chefs, served under palm-fringed skies.",
  phone: "+92 305 7774444",
  phoneHref: "tel:+923057774444",
  whatsapp: "923057774444",
  // Manager's WhatsApp for reservation/order notifications (demo number).
  managerWhatsapp: "923057774444",
  email: "hello@kkgrove.com",
  address: {
    line1: "Plot #36, Block 7/8, Modern Co-operative Housing Society",
    line2: "Main Tipu Sultan Road, Karachi, Pakistan",
    maps: "https://www.google.com/maps/search/?api=1&query=Tipu+Sultan+Road+Karachi",
  },
  hours: [
    { days: "Monday – Thursday", time: "12:30 PM – 11:30 PM" },
    { days: "Friday – Saturday", time: "12:30 PM – 12:00 AM" },
    { days: "Sunday", time: "6:00 PM – 12:00 AM" },
  ],
  // Placeholder links — KK Grove is a fictional brand, so these intentionally
  // don't point anywhere. Swap in real profile URLs for a live deployment.
  social: {
    instagram: "#",
    facebook: "#",
  },
  rating: { score: "4.2", count: "2,700+" },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Order Online", href: "/order" },
  { label: "Reservations", href: "/#reserve" },
  { label: "Portfolios", href: "/portfolios" },
  { label: "Contact", href: "/contact" },
];

// Staff roles for the operations dashboards.
export const roles = ["manager", "waiter", "chef"] as const;
export type Role = (typeof roles)[number];
