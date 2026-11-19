import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ReviewForm, { type ReviewerType } from "@/components/ReviewForm";

export const metadata: Metadata = {
  title: "Leave a review | PROSITEUK",
  description: "Tell us about your experience working with PROSITEUK.",
  robots: { index: false, follow: false },
};

const validTypes = ["client", "candidate", "placement"];

function cleanName(value: unknown) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== "string") return "";
  const name = raw.trim().replace(/[^\p{L}\p{M}' -]/gu, "").slice(0, 40);
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
}

export default function ReviewPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const name = cleanName(searchParams.name);
  const typeParam = Array.isArray(searchParams.type) ? searchParams.type[0] : searchParams.type;
  const type = (validTypes.includes(typeParam ?? "") ? typeParam : "") as ReviewerType;

  return (
    <PageShell>
      <section className="bg-ink text-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <p className="uppercase tracking-[0.18em] text-sm text-white/70 mb-4">Leave a review</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          {name ? `Hi ${name}, how was working with PROSITEUK?` : "How was working with PROSITEUK?"}
        </h1>
        <p className="max-w-3xl text-white/85">
          It only takes a couple of minutes. Your feedback helps us keep improving, and helps other clients and
          candidates know what to expect from us.
        </p>
      </section>

      <section className="rounded-xl glass-outline-subtle bg-gradient-to-br from-[#efefef] via-white to-white p-8 sm:p-10">
        <ReviewForm initialName={name} initialType={type} />
      </section>
    </PageShell>
  );
}
