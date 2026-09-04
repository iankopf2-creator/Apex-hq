import { readJsonArray, writeJsonArray } from "../../../shared/json-store";
import type { BookingRequestStub } from "./types";

const FILENAME = "booking-requests.json";

export async function listBookingRequests(): Promise<BookingRequestStub[]> {
  return readJsonArray<BookingRequestStub>(FILENAME);
}

export async function saveBookingRequest(
  request: BookingRequestStub
): Promise<BookingRequestStub> {
  const all = await listBookingRequests();
  all.push(request);
  await writeJsonArray(FILENAME, all);
  return request;
}

export async function listBookingRequestsForSlug(
  slug: string
): Promise<BookingRequestStub[]> {
  const all = await listBookingRequests();
  return all.filter((r) => r.businessSlug === slug);
}
