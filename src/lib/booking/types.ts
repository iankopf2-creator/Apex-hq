export type BookingRequestStub = {
  id: string;
  businessSlug: string;
  businessName: string;
  customerName: string;
  phone?: string;
  email?: string;
  serviceName?: string;
  preferredTime: string;
  notes?: string;
  status: "stub_received";
  createdAt: string;
};
