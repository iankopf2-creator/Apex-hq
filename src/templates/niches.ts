import type { NicheTemplate } from "@/lib/types";

const weekday = "8:00 AM – 6:00 PM";
const sat = "9:00 AM – 2:00 PM";
const closed = "Closed";

const defaultHours = {
  mon: weekday,
  tue: weekday,
  wed: weekday,
  thu: weekday,
  fri: weekday,
  sat,
  sun: closed,
};

/**
 * Config-driven niche templates. No real business data — placeholders only.
 * Wizard + demo seed must pull from these templates, never hardcode a shop.
 */
export const NICHE_TEMPLATES: NicheTemplate[] = [
  {
    id: "hvac",
    label: "HVAC",
    defaultTagline: "Reliable heating & cooling for your home",
    defaultHours,
    defaultServices: [
      { name: "AC Repair", description: "Diagnostic and repair for central AC", priceFrom: 89 },
      { name: "Furnace Tune-Up", description: "Seasonal safety and efficiency check", priceFrom: 99 },
      { name: "System Install", description: "New HVAC system installation quote", priceFrom: 0 },
    ],
    heroHints: ["24/7 emergency options", "Licensed technicians", "Same-day service windows"],
    ctaLabel: "Book a service visit",
    accentHint: "sky",
  },
  {
    id: "plumber",
    label: "Plumber",
    defaultTagline: "Fast, clean plumbing done right",
    defaultHours,
    defaultServices: [
      { name: "Leak Repair", description: "Find and fix pipe or fixture leaks", priceFrom: 79 },
      { name: "Drain Clearing", description: "Clogged sink, tub, or main line", priceFrom: 99 },
      { name: "Water Heater Service", description: "Repair or replacement consult", priceFrom: 129 },
    ],
    heroHints: ["Upfront pricing", "Respect for your home", "Emergency slots"],
    ctaLabel: "Schedule plumbing help",
    accentHint: "cyan",
  },
  {
    id: "salon",
    label: "Salon",
    defaultTagline: "Look your best — book with ease",
    defaultHours: {
      mon: closed,
      tue: "10:00 AM – 7:00 PM",
      wed: "10:00 AM – 7:00 PM",
      thu: "10:00 AM – 7:00 PM",
      fri: "10:00 AM – 8:00 PM",
      sat: "9:00 AM – 5:00 PM",
      sun: closed,
    },
    defaultServices: [
      { name: "Haircut", description: "Cut and style", priceFrom: 45 },
      { name: "Color", description: "Full color or touch-up", priceFrom: 85 },
      { name: "Blowout", description: "Wash and professional blow dry", priceFrom: 40 },
    ],
    heroHints: ["Online booking", "Gift cards soon", "Walk-ins when available"],
    ctaLabel: "Book an appointment",
    accentHint: "rose",
  },
  {
    id: "trucking",
    label: "Trucking",
    defaultTagline: "On-time freight you can count on",
    defaultHours: {
      mon: "6:00 AM – 6:00 PM",
      tue: "6:00 AM – 6:00 PM",
      wed: "6:00 AM – 6:00 PM",
      thu: "6:00 AM – 6:00 PM",
      fri: "6:00 AM – 6:00 PM",
      sat: "7:00 AM – 12:00 PM",
      sun: "Closed",
    },
    defaultServices: [
      { name: "Regional Haul", description: "Short-haul and regional freight lanes", priceFrom: 0 },
      { name: "Long-Haul", description: "Cross-country loads with clear ETAs", priceFrom: 0 },
      { name: "Quote Request", description: "Lane coverage and rate response", priceFrom: 0 },
    ],
    heroHints: ["Clear lane coverage", "Quote requests online", "Phone fallback when you need a human"],
    ctaLabel: "Request a quote",
    accentHint: "amber",
  },
];

export function getTemplate(niche: string): NicheTemplate | undefined {
  return NICHE_TEMPLATES.find((t) => t.id === niche);
}
