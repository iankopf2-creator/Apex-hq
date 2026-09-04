import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessBySlug } from "@/lib/store";
import { saveBookingRequest } from "@/lib/booking/store";
import { appendActionLog } from "@/lib/action-log";

const bodySchema = z.object({
  businessSlug: z.string().min(1),
  customerName: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  serviceName: z.string().optional(),
  preferredTime: z.string().min(2),
  notes: z.string().optional(),
});

/**
 * Stub booking intake only — no calendar sync, no SMS, no payments.
 */
export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.parse(json);
    const business = await getBusinessBySlug(parsed.businessSlug);
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const request = await saveBookingRequest({
      id: crypto.randomUUID(),
      businessSlug: business.slug,
      businessName: business.name,
      customerName: parsed.customerName.trim(),
      phone: parsed.phone?.trim() || undefined,
      email: parsed.email?.trim() || undefined,
      serviceName: parsed.serviceName?.trim() || undefined,
      preferredTime: parsed.preferredTime.trim(),
      notes: parsed.notes?.trim() || undefined,
      status: "stub_received",
      createdAt: new Date().toISOString(),
    });

    await appendActionLog({
      agent: "system",
      action: "booking_stub_received",
      confidence: 1,
      notes: `Stub booking for ${business.name} from ${request.customerName}`,
      meta: { bookingId: request.id, slug: business.slug },
    });

    return NextResponse.json({
      ok: true,
      stub: true,
      message:
        "Request received (stub). No calendar invite or confirmation text was sent.",
      request,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
