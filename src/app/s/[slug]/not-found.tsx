import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Site not found</h1>
      <p className="mt-2 text-muted-foreground">This business slug is not published yet.</p>
      <p className="mt-6">
        <Link className="text-primary underline-offset-4 hover:underline" href="/onboarding">
          Start onboarding
        </Link>
      </p>
    </main>
  );
}
