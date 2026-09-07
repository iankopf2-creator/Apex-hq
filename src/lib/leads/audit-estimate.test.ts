import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  AUDIT_DISCLAIMER,
  AUDIT_MISS_RATE,
  DEFAULT_JOB_USD,
  NICHE_JOB_USD,
  computeAuditEstimate,
} from "./audit";

const PROD_DEMO = "https://apex-hq-five.vercel.app";

describe("audit estimate contract", () => {
  let prevAppUrl: string | undefined;

  beforeEach(() => {
    prevAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  });

  afterEach(() => {
    if (prevAppUrl === undefined) delete process.env.NEXT_PUBLIC_APP_URL;
    else process.env.NEXT_PUBLIC_APP_URL = prevAppUrl;
  });

  it("uses missRate 0.3 and niche job USD map (default 120)", () => {
    expect(AUDIT_MISS_RATE).toBe(0.3);
    expect(NICHE_JOB_USD).toMatchObject({
      hvac: 275,
      plumber: 225,
      salon: 85,
      trucking: 150,
      electrician: 200,
      roofing: 350,
    });
    expect(DEFAULT_JOB_USD).toBe(120);
  });

  it("disclaimer contains ESTIMATES ONLY", () => {
    expect(AUDIT_DISCLAIMER).toContain("ESTIMATES ONLY");
    const est = computeAuditEstimate({ niche: "hvac", fitScore: 50 });
    expect(est.disclaimer).toContain("ESTIMATES ONLY");
    expect(est.missRate).toBe(0.3);
  });

  it("lost revenue = missedCalls * jobUsd", () => {
    const est = computeAuditEstimate({ niche: "hvac", fitScore: 50 });
    expect(est.jobUsd).toBe(275);
    expect(est.estimatedLostRevenueUsd).toBe(
      est.estimatedMissedCallsPerMonth * est.jobUsd
    );
    expect(est.estimatedMissedCallsPerMonth).toBe(
      Math.max(6, Math.round(est.inboundAssumed * AUDIT_MISS_RATE))
    );
  });

  it("unknown niche uses default job USD 120", () => {
    const est = computeAuditEstimate({ niche: "painting", fitScore: 40 });
    expect(est.jobUsd).toBe(120);
    expect(est.estimatedLostRevenueUsd).toBe(
      est.estimatedMissedCallsPerMonth * 120
    );
  });

  it("localhost APP_URL falls back to prod demo host", () => {
    process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
    expect(computeAuditEstimate({ niche: "salon", fitScore: 10 }).demoLink).toBe(
      PROD_DEMO
    );
    process.env.NEXT_PUBLIC_APP_URL = "http://127.0.0.1:3000/";
    expect(computeAuditEstimate({ niche: "salon", fitScore: 10 }).demoLink).toBe(
      PROD_DEMO
    );
  });

  it("non-localhost APP_URL is used as demo host", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://custom.example.com/";
    expect(computeAuditEstimate({ niche: "roofing", fitScore: 20 }).demoLink).toBe(
      "https://custom.example.com"
    );
  });
});
