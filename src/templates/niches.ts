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
    id: "electrician",
    label: "Electrician",
    defaultTagline: "Licensed electrical work you can schedule",
    defaultHours: {
      mon: "8:00 AM – 6:00 PM",
      tue: "8:00 AM – 6:00 PM",
      wed: "8:00 AM – 6:00 PM",
      thu: "8:00 AM – 6:00 PM",
      fri: "8:00 AM – 6:00 PM",
      sat: "9:00 AM – 1:00 PM",
      sun: "Closed",
    },
    defaultServices: [
      { name: "Outlet / Switch Repair", description: "Diagnose and fix common electrical issues", priceFrom: 89 },
      { name: "Panel Upgrade Consult", description: "Safety check and upgrade options", priceFrom: 0 },
      { name: "Lighting Install", description: "Indoor/outdoor fixture installation", priceFrom: 129 },
    ],
    heroHints: ["Licensed & insured", "Clear scheduling", "Upfront scope"],
    ctaLabel: "Book an electrical visit",
    accentHint: "amber",
  },
  {
    id: "roofing",
    label: "Roofing",
    defaultTagline: "Inspect, repair, replace — clear next steps",
    defaultHours: {
      mon: "7:00 AM – 5:00 PM",
      tue: "7:00 AM – 5:00 PM",
      wed: "7:00 AM – 5:00 PM",
      thu: "7:00 AM – 5:00 PM",
      fri: "7:00 AM – 5:00 PM",
      sat: "8:00 AM – 12:00 PM",
      sun: "Closed",
    },
    defaultServices: [
      { name: "Roof Inspection", description: "Full visual inspection with written notes", priceFrom: 0 },
      { name: "Leak Repair", description: "Find and fix active leaks", priceFrom: 199 },
      { name: "Full Re-Roof Quote", description: "Material options and timeline", priceFrom: 0 },
    ],
    heroHints: ["Licensed crews", "Clear written scope", "Insurance-friendly docs"],
    ctaLabel: "Request a roof inspection",
    accentHint: "orange",
  },
  {
    id: "landscaping",
    label: "Landscaping",
    defaultTagline: "Yards that look cared for — week after week",
    defaultHours: {
      mon: "7:00 AM – 5:00 PM",
      tue: "7:00 AM – 5:00 PM",
      wed: "7:00 AM – 5:00 PM",
      thu: "7:00 AM – 5:00 PM",
      fri: "7:00 AM – 5:00 PM",
      sat: "8:00 AM – 12:00 PM",
      sun: "Closed",
    },
    defaultServices: [
      { name: "Lawn Mowing", description: "Weekly or biweekly cuts", priceFrom: 45 },
      { name: "Mulch & Beds", description: "Clean beds and fresh mulch", priceFrom: 150 },
      { name: "Seasonal Cleanup", description: "Spring or fall yard reset", priceFrom: 199 },
    ],
    heroHints: ["Recurring schedules", "Clear property notes", "Text when on the way"],
    ctaLabel: "Request a yard estimate",
    accentHint: "lime",
  },
];

export function getTemplate(niche: string): NicheTemplate | undefined {
  return NICHE_TEMPLATES.find((t) => t.id === niche);
}
