export type NicheId = "hvac" | "plumber" | "salon";

export type BusinessHours = {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
};

export type ServiceItem = {
  id: string;
  name: string;
  description?: string;
  priceFrom?: number;
};

export type BusinessProfile = {
  id: string;
  slug: string;
  name: string;
  niche: NicheId;
  city: string;
  hours: BusinessHours;
  services: ServiceItem[];
  photos: string[];
  phone?: string;
  /**
   * CallRail (or similar) website swap-target / public click-to-call number.
   * Prefer this for all /s/[slug] tel: links when set.
   */
  trackingPhone?: string;
  /**
   * LSA-only destination number for ops — NEVER render on /s/[slug] HTML.
   */
  lsaPhone?: string;
  /** When true, tenant opted in to load call-tracking JS (off by default). */
  callTrackingOptIn?: boolean;
  email?: string;
  tagline?: string;
  primaryColor?: string;
  createdAt: string;
  updatedAt: string;
};

export type NicheTemplate = {
  id: NicheId;
  label: string;
  defaultTagline: string;
  defaultHours: BusinessHours;
  defaultServices: Omit<ServiceItem, "id">[];
  heroHints: string[];
  ctaLabel: string;
  accentHint: string;
};
