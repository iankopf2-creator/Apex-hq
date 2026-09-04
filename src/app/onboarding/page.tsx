import Link from "next/link";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";

export const metadata = {
  title: "Onboarding | Apex HQ",
  description: "Set up your local business front door",
};

export default function OnboardingPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-primary">Apex HQ</p>
          <h1 className="text-2xl font-bold tracking-tight">Create your front door</h1>
        </div>
        <Link className="text-sm text-muted-foreground underline-offset-4 hover:underline" href="/">
          Home
        </Link>
      </div>
      <OnboardingWizard />
    </main>
  );
}
