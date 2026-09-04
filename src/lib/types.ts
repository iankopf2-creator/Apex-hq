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
