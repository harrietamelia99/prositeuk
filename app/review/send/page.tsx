import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ReviewLinkMaker from "@/components/ReviewLinkMaker";

export const metadata: Metadata = {
  title: "Send a review link | PROSITEUK",
  robots: { index: false, follow: false },
};

export default function ReviewLinkMakerPage() {
  return (
    <PageShell>
      <section className="bg-ink text-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <p className="uppercase tracking-[0.18em] text-sm text-white/70 mb-4">Team only</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Send a review link</h1>
        <p className="max-w-3xl text-white/85">
          Type their first name, choose who they are, then send. The message and personal link are written for you.
        </p>
      </section>

      <section className="rounded-xl glass-outline-subtle bg-gradient-to-br from-[#efefef] via-white to-white p-6 sm:p-10">
        <ReviewLinkMaker />
      </section>
    </PageShell>
  );
}
