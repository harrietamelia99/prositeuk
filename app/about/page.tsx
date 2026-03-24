import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import PageShell from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="bg-ink text-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <div>
          <p className="uppercase tracking-[0.18em] text-sm text-white/70 mb-4">About PROSITEUK</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Built on industry insight and trusted partnerships</h1>
          <p className="max-w-3xl text-white/85">
            We are a specialist engineering and construction recruitment agency helping businesses secure
            highly skilled talent while supporting candidates in finding the right opportunities.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#efefef] via-white to-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <div>
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our approach</h2>
              <p className="text-charcoal/80 mb-4">
                We focus on quality over volume. Every placement is guided by a clear understanding of job
                requirements, team culture and long-term goals.
              </p>
              <p className="text-charcoal/80 mb-6">
                By combining sector knowledge with a personal service, we deliver outcomes that work for both
                employers and candidates.
              </p>
              <Button href="/contact">Speak With Our Team</Button>
            </div>
            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden">
              <Image
                src="/about-construction.png"
                alt="Skyscrapers under construction with cranes"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#efefef] via-white to-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <div>
          <p className="uppercase tracking-[0.16em] text-xs text-charcoal/60 mb-3">Recruitment focus</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Blue and white collar talent, placed with precision</h2>
          <p className="text-charcoal/75 max-w-4xl mb-8">
            PROSITEUK supports engineering and construction projects with specialist hiring across technical
            and site-based teams, with a strong track record in high-impact infrastructure environments.
          </p>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mb-6">
            <article className="rounded-lg border border-charcoal/15 bg-offwhite p-5 glass-outline-subtle">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-crimson to-ink text-white flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path d="M12 3v18M4 12h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Core sectors and services</h3>
              <p className="text-sm text-charcoal/75">
                Engineering recruitment, groundworker recruitment and plant operative recruitment with role-by-role
                shortlisting based on site requirements.
              </p>
            </article>

            <article className="rounded-lg border border-charcoal/15 bg-offwhite p-5 glass-outline-subtle">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-crimson to-ink text-white flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <rect x="3" y="7" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Most frequent placements</h3>
              <p className="text-sm text-charcoal/75">
                Our highest-volume placements are site engineers and senior engineers, while we continue expanding
                delivery in groundworker and plant operative hiring.
              </p>
            </article>

            <article className="rounded-lg border border-charcoal/15 bg-offwhite p-5 glass-outline-subtle">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-crimson to-ink text-white flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path d="M4 17.5V8.5l8-4 8 4v9l-8 4-8-4Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="m8.5 12 2 2 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Ideal client profile</h3>
              <p className="text-sm text-charcoal/75">
                We primarily partner with tier 1, tier 2 and tier 3 main contractors, plus growth-focused SMEs
                delivering civil, infrastructure and complex build programmes.
              </p>
            </article>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-lg border border-charcoal/15 bg-gradient-to-br from-[#efefef] via-white to-white p-6 glass-outline-subtle">
              <h3 className="text-xl font-semibold mb-3">What differentiates PROSITEUK</h3>
              <p className="text-charcoal/80 mb-3">
                Our edge is practical industry knowledge and long-standing relationships built through direct project
                delivery and trusted referrals.
              </p>
              <p className="text-charcoal/80">
                Placements have generated consistently positive feedback with no replacement requirements to date,
                and the business has grown organically through repeat clients and word of mouth.
              </p>
            </article>

            <article className="rounded-lg border border-charcoal/15 bg-gradient-to-br from-[#efefef] via-white to-white p-6 glass-outline-subtle">
              <h3 className="text-xl font-semibold mb-3">Standout projects and programmes</h3>
              <ul className="space-y-2 text-charcoal/80">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-crimson shrink-0" />
                  <span>Sizewell C - one of the UK&apos;s largest infrastructure projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-crimson shrink-0" />
                  <span>Multiple Transport for London projects and supply needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-crimson shrink-0" />
                  <span>National Highways schemes across major routes</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#efefef] via-white to-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          <div className="lg:col-span-2 rounded-xl bg-offwhite border border-charcoal/15 p-7 sm:p-8 glass-outline-subtle">
            <p className="uppercase tracking-[0.16em] text-xs text-charcoal/60 mb-3">Leadership spotlight</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why our director, Callam, is uniquely placed to recruit engineering talent
            </h2>
            <p className="text-charcoal/80 mb-4">
              As our director, Callam&apos;s background in site engineering gives PROSITEUK first-hand insight into what
              successful delivery looks like on site and what employers genuinely need from technical hires.
            </p>
            <p className="text-charcoal/80 mb-4">
              Having worked in live engineering environments, he understands project pace, technical standards,
              and the practical challenges teams face every day. That perspective helps us evaluate candidates
              beyond job titles and keywords.
            </p>
            <p className="text-charcoal/80 mb-6">
              The result is stronger shortlists, better long-term placements, and recruitment decisions grounded
              in real industry experience rather than assumptions.
            </p>

            <div className="rounded-lg bg-white border border-charcoal/15 p-5 glass-outline-subtle">
              <p className="text-charcoal/85 italic">
                &ldquo;Great recruitment in engineering starts with understanding the real demands of site
                delivery, not just what is written on a CV.&rdquo;
              </p>
              <p className="text-xs uppercase tracking-[0.14em] text-charcoal/60 mt-3">Callam O&apos;Sheen • Director</p>
            </div>
          </div>

          <aside className="rounded-xl bg-white border border-charcoal/15 p-6 sm:p-7 glass-outline-subtle flex flex-col justify-between">
            <div>
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-crimson to-ink text-white flex items-center justify-center text-xl font-bold mb-4">
                CO
              </div>
              <h3 className="text-xl font-bold mb-2">Connect with Callam</h3>
              <p className="text-sm text-charcoal/75 mb-5">
                View Callam&apos;s profile to learn more about his engineering background and recruitment focus.
              </p>
              <div className="space-y-2 text-sm text-charcoal/80">
                <p>9+ years in civil engineering</p>
                <p>Director at PROSITEUK</p>
                <p>London & South East focus</p>
              </div>
            </div>

            <Link
              href="https://www.linkedin.com/in/callam-o-sheen-39199615a/"
              target="_blank"
              className="mt-6 inline-flex w-fit rounded-md bg-crimson px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-crimson/90 transition-colors"
            >
              View LinkedIn profile
            </Link>
          </aside>
        </div>
      </section>

      <section className="rounded-xl overflow-hidden glass-outline-subtle">
        <div className="bg-gradient-to-br from-crimson/80 via-crimson/55 to-ink text-white p-8 sm:p-10">
          <p className="uppercase tracking-[0.16em] text-xs text-white/75 mb-3">Ready to work together?</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Let&apos;s plan your next hire or career move</h2>
          <p className="text-white/90 max-w-3xl mb-6">
            Speak with our team for practical recruitment support built around your project goals and timelines.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">Book a call</Button>
            <Button href="/jobs" variant="outlined">View live jobs</Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
