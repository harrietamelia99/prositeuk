import Button from "@/components/Button";
import PageShell from "@/components/PageShell";

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-[#efefef] via-white to-white py-12 sm:py-14 rounded-xl glass-outline-subtle">
      <div className="px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-6">Privacy policy</h1>
        <p className="text-charcoal/80 mb-4">
          This placeholder privacy policy page is included for site completeness and routing.
        </p>
        <p className="text-charcoal/80">
          Replace this content with your final legal privacy policy details, including data processing,
          retention and contact information.
        </p>
      </div>
      </section>

      <section className="rounded-xl overflow-hidden glass-outline-subtle">
        <div className="bg-gradient-to-br from-crimson/80 via-crimson/55 to-ink text-white p-8 sm:p-10">
          <p className="uppercase tracking-[0.16em] text-xs text-white/75 mb-3">Questions about data?</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Contact our team for clarification</h2>
          <p className="text-white/90 max-w-3xl mb-6">
            If you have any privacy or data handling questions, we&apos;re here to help and provide clear answers.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">Get in touch</Button>
            <Button href="/about" variant="outlined">Learn more about us</Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
