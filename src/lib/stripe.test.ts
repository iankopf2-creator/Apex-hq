import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  REQUIRED_STRIPE_ENV_VARS,
  STRIPE_TIERS,
  getTier,
  isStripeConfigured,
  missingStripeEnvVars,
} from "./stripe";

const FAKE = {
  STRIPE_SECRET_KEY: "sk_test_fake_placeholder_not_real",
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "pk_test_fake_placeholder_not_real",
  STRIPE_PRICE_STARTER: "price_fake_starter_placeholder",
  NEXT_PUBLIC_APP_URL: "https://example.test",
} as const;

describe("STRIPE_TIERS pricing contract", () => {
  it("exposes starter/growth/pro at $49/$99/$199", () => {
    const byId = Object.fromEntries(STRIPE_TIERS.map((t) => [t.id, t]));
    expect(byId.starter.priceMonthly).toBe(49);
    expect(byId.growth.priceMonthly).toBe(99);
    expect(byId.pro.priceMonthly).toBe(199);
    expect(byId.starter.name).toBe("Starter");
    expect(byId.growth.name).toBe("Growth");
    expect(byId.pro.name).toBe("Pro");
  });
});

describe("REQUIRED_STRIPE_ENV_VARS", () => {
  it("lists required names only (no inventing secrets)", () => {
    expect([...REQUIRED_STRIPE_ENV_VARS]).toEqual([
      "STRIPE_SECRET_KEY",
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      "STRIPE_PRICE_STARTER",
      "NEXT_PUBLIC_APP_URL",
    ]);
  });
});

describe("isStripeConfigured / missingStripeEnvVars", () => {
  const keys = [
    "STRIPE_SECRET_KEY",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "STRIPE_PRICE_STARTER",
    "NEXT_PUBLIC_APP_URL",
  ] as const;

  let snapshot: Record<string, string | undefined>;

  beforeEach(() => {
    snapshot = {};
    for (const k of keys) {
      snapshot[k] = process.env[k];
      delete process.env[k];
    }
  });

  afterEach(() => {
    for (const k of keys) {
      if (snapshot[k] === undefined) delete process.env[k];
      else process.env[k] = snapshot[k];
    }
  });

  it("is false when any of secret/publishable/starter price missing", () => {
    expect(isStripeConfigured()).toBe(false);
    process.env.STRIPE_SECRET_KEY = FAKE.STRIPE_SECRET_KEY;
    expect(isStripeConfigured()).toBe(false);
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
      FAKE.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    expect(isStripeConfigured()).toBe(false);
  });

  it("is true only when secret + publishable + starter price set (fake placeholders)", () => {
    process.env.STRIPE_SECRET_KEY = FAKE.STRIPE_SECRET_KEY;
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
      FAKE.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    process.env.STRIPE_PRICE_STARTER = FAKE.STRIPE_PRICE_STARTER;
    expect(isStripeConfigured()).toBe(true);
  });

  it("missingStripeEnvVars returns only unset required names", () => {
    expect(missingStripeEnvVars()).toEqual([...REQUIRED_STRIPE_ENV_VARS]);
    process.env.STRIPE_SECRET_KEY = FAKE.STRIPE_SECRET_KEY;
    process.env.NEXT_PUBLIC_APP_URL = FAKE.NEXT_PUBLIC_APP_URL;
    expect(missingStripeEnvVars()).toEqual([
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      "STRIPE_PRICE_STARTER",
    ]);
  });
});

describe("getTier", () => {
  it("returns known tiers and undefined for unknown", () => {
    expect(getTier("starter")?.id).toBe("starter");
    expect(getTier("growth")?.priceMonthly).toBe(99);
    expect(getTier("pro")?.name).toBe("Pro");
    expect(getTier("enterprise")).toBeUndefined();
    expect(getTier("")).toBeUndefined();
  });
});
