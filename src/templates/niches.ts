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
    heroHints: ["Call for same-day help", "Licensed & insured", "Clear pricing before we start"],
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
    heroHints: ["Call for emergencies", "Free estimates on planned work", "Licensed & insured"],
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
    heroHints: ["Book online in minutes", "Starting prices listed", "Stylists who listen"],
    ctaLabel: "Book now",
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
    heroHints: ["Call for emergencies", "License # on request", "Upfront scope"],
    ctaLabel: "Get an estimate",
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
    heroHints: ["Call for storm damage", "Licensed & insured", "Estimates for planned work"],
    ctaLabel: "Get a roof estimate",
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
    heroHints: ["Seasonal packages", "Recurring or one-off", "Licensed & insured"],
    ctaLabel: "Get a lawn quote",
    accentHint: "lime",
  },
  {
    id: "auto_detail",
    label: "Auto detailing",
    defaultTagline: "Showroom-clean without the showroom price",
    defaultHours: {
      mon: "9:00 AM – 6:00 PM",
      tue: "9:00 AM – 6:00 PM",
      wed: "9:00 AM – 6:00 PM",
      thu: "9:00 AM – 6:00 PM",
      fri: "9:00 AM – 6:00 PM",
      sat: "9:00 AM – 4:00 PM",
      sun: "Closed",
    },
    defaultServices: [
      { name: "Exterior Wash & Wax", description: "Hand wash, dry, and protect", priceFrom: 79 },
      { name: "Interior Detail", description: "Vacuum, wipe-down, glass", priceFrom: 99 },
      { name: "Full Detail", description: "Inside + outside package", priceFrom: 179 },
    ],
    heroHints: ["Mobile options", "Clear package pricing", "Photo before/after"],
    ctaLabel: "Book a detail",
    accentHint: "blue",
  },
  {
    id: "cleaning",
    label: "Cleaning",
    defaultTagline: "Spotless spaces on a schedule you can count on",
    defaultHours: {
      mon: "8:00 AM – 5:00 PM",
      tue: "8:00 AM – 5:00 PM",
      wed: "8:00 AM – 5:00 PM",
      thu: "8:00 AM – 5:00 PM",
      fri: "8:00 AM – 5:00 PM",
      sat: "9:00 AM – 1:00 PM",
      sun: "Closed",
    },
    defaultServices: [
      { name: "Standard Clean", description: "Recurring home or office clean", priceFrom: 120 },
      { name: "Deep Clean", description: "Baseboards, appliances, detail work", priceFrom: 220 },
      { name: "Move-in / Move-out", description: "Empty-home reset", priceFrom: 250 },
    ],
    heroHints: ["Recurring plans save more", "One-time deep cleans", "Insured cleaners"],
    ctaLabel: "Book recurring",
    accentHint: "teal",
  },
  {
    id: "pest_control",
    label: "Pest control",
    defaultTagline: "Inspect, treat, prevent — without the scare tactics",
    defaultHours: {
      mon: "8:00 AM – 5:00 PM",
      tue: "8:00 AM – 5:00 PM",
      wed: "8:00 AM – 5:00 PM",
      thu: "8:00 AM – 5:00 PM",
      fri: "8:00 AM – 5:00 PM",
      sat: "9:00 AM – 12:00 PM",
      sun: "Closed",
    },
    defaultServices: [
      { name: "Home Inspection", description: "Identify activity and entry points", priceFrom: 0 },
      { name: "General Treatment", description: "Interior/exterior service visit", priceFrom: 149 },
      { name: "Quarterly Plan", description: "Ongoing prevention schedule", priceFrom: 99 },
    ],
    heroHints: ["Call for same-day help", "Licensed technicians", "Pet-aware options"],
    ctaLabel: "Book inspection",
    accentHint: "lime",
  },
  {
    id: "moving",
    label: "Moving",
    defaultTagline: "Moves that stay on plan — pack, load, deliver",
    defaultHours: {
      mon: "8:00 AM – 6:00 PM",
      tue: "8:00 AM – 6:00 PM",
      wed: "8:00 AM – 6:00 PM",
      thu: "8:00 AM – 6:00 PM",
      fri: "8:00 AM – 6:00 PM",
      sat: "8:00 AM – 4:00 PM",
      sun: "Closed",
    },
    defaultServices: [
      { name: "Local Move", description: "Apartment or home within the metro", priceFrom: 0 },
      { name: "Packing Help", description: "Full or partial packing labor", priceFrom: 199 },
      { name: "Long-Distance Quote", description: "Interstate move estimate", priceFrom: 0 },
    ],
    heroHints: ["Licensed & insured", "Fixed-scope options", "Arrival windows"],
    ctaLabel: "Get a moving quote",
    accentHint: "indigo",
  },
  {
    id: "painting",
    label: "Painting",
    defaultTagline: "Fresh walls, clean lines — estimate, prep, paint",
    defaultHours: {
      mon: "8:00 AM – 5:00 PM",
      tue: "8:00 AM – 5:00 PM",
      wed: "8:00 AM – 5:00 PM",
      thu: "8:00 AM – 5:00 PM",
      fri: "8:00 AM – 5:00 PM",
      sat: "9:00 AM – 1:00 PM",
      sun: "Closed",
    },
    defaultServices: [
      { name: "Interior Paint", description: "Rooms, trim, and ceilings", priceFrom: 0 },
      { name: "Exterior Paint", description: "Siding and outdoor surfaces", priceFrom: 0 },
      { name: "Cabinet Refinish", description: "Kitchen or bath cabinet refresh", priceFrom: 499 },
    ],
    heroHints: ["Written estimate", "Prep options clear", "Schedule when ready"],
    ctaLabel: "Request estimate",
    accentHint: "purple",
  },
];

export function getTemplate(niche: string): NicheTemplate | undefined {
  return NICHE_TEMPLATES.find((t) => t.id === niche);
}
