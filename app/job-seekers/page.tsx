import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import JobMap from "@/components/JobMap";
import JobMetaIcons from "@/components/JobMetaIcons";
import PageShell from "@/components/PageShell";
import { getPublishedJobs } from "@/lib/crm-store";

export const dynamic = "force-dynamic";

type Benefit = {
  title: string;
  description: string;
  icon: "briefcase" | "chat" | "path";
};

const benefits: Benefit[] = [
  {
    title: "Exclusive opportunities",
    description: "Access to high-quality site engineering and construction vacancies across the UK.",
    icon: "briefcase"
  },
  {
    title: "Real recruiter support",
    description: "Get practical CV, interview and career advice from specialist consultants.",
    icon: "chat"
  },
  {
    title: "Flexible pathways",
    description: "Choose temporary, contract or permanent roles that match your goals.",
    icon: "path"
  }
];

function BenefitIcon({ icon }: { icon: Benefit["icon"] }) {
  if (icon === "briefcase") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="3" y="7" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 12h18" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "chat") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path d="M6.5 7h11A2.5 2.5 0 0 1 20 9.5v5A2.5 2.5 0 0 1 17.5 17H11l-4 3v-3h-.5A2.5 2.5 0 0 1 4 14.5v-5A2.5 2.5 0 0 1 6.5 7Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 11h8M8 14h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d="M4 18c2.2-3.8 5.3-5.8 9.5-6.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13.5 11.9 11 9.7M13.5 11.9l-2.2 2.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 6c-2.2 3.8-5.3 5.8-9.5 6.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.5 12.1 13 14.3M10.5 12.1l2.2-2.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function JobSeekersPage() {
  const jobs = await getPublishedJobs();
  const previewJobs = jobs.slice(0, 3);

  return (
    <PageShell>
      <section className="bg-ink text-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <div>
          <p className="uppercase tracking-[0.18em] text-sm text-white/70 mb-4">Job Seekers</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Find the right role for your next move</h1>
          <p className="max-w-3xl text-white/85">
            Whether you are actively searching or open to new opportunities, we connect you with employers
            that match your experience and ambitions.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#efefef] via-white to-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <div>
          <div className="grid gap-10 lg:grid-cols-2 items-stretch">
            <div className="relative min-h-[18rem] sm:min-h-[24rem] lg:min-h-full rounded-xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/job-seekers-site.png"
                alt="Site engineer surveying on construction site"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="uppercase tracking-[0.16em] text-xs text-charcoal/60 mb-3">Candidate support</p>
              <h2 className="text-3xl font-bold mb-3">How we support you</h2>
              <p className="text-charcoal/75 mb-6">
                A more personal recruitment experience, from first chat to accepted offer.
              </p>
              <div className="space-y-3 mb-7">
                {benefits.map((benefit) => (
                  <article key={benefit.title} className="rounded-lg border border-charcoal/15 bg-offwhite p-4 sm:p-5 glass-outline-subtle">
                    <div className="flex items-start gap-3">
                      <span className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-crimson to-ink text-white flex items-center justify-center">
                        <BenefitIcon icon={benefit.icon} />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-charcoal">{benefit.title}</h3>
                        <p className="text-sm text-charcoal/75 mt-1">{benefit.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="rounded-lg border border-charcoal/15 bg-white p-4 sm:p-5 glass-outline-subtle">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-charcoal/75">Ready to apply? Explore current opportunities now.</p>
                  <Button href="/jobs">View live jobs</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#efefef] via-white to-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Live jobs</h2>
              <p className="text-charcoal/75 mt-2">Browse some of our latest opportunities and click through for full details.</p>
            </div>
            <Button href="/jobs">View full job board</Button>
          </div>

          <div className="space-y-3">
            {previewJobs.length === 0 ? (
              <div className="rounded-lg border border-charcoal/15 bg-offwhite p-7 glass-outline-subtle">
                <p className="text-sm text-charcoal/80">No live jobs are published right now. Check back soon.</p>
              </div>
            ) : null}
            {previewJobs.map((job) => (
              <article key={job.id} className="rounded-lg border border-charcoal/15 p-6 bg-offwhite glass-outline-subtle">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                  </div>
                  <Link
                    href={`/jobs/${job.slug}`}
                    className="rounded-md bg-crimson px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
                  >
                    View role
                  </Link>
                </div>
                <JobMetaIcons
                  className="mt-4"
                  location={job.location}
                  salary={job.salary}
                  employmentType={job.employmentType}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-white text-xl font-semibold">Where we&apos;re hiring</h2>
          <p className="text-white/50 text-sm mt-1">Click a pin to see roles by location.</p>
        </div>
        <JobMap jobs={jobs} />
      </section>

      <section className="rounded-xl overflow-hidden glass-outline-subtle">
        <div className="bg-gradient-to-br from-crimson/80 via-crimson/55 to-ink text-white p-8 sm:p-10">
          <p className="uppercase tracking-[0.16em] text-xs text-white/75 mb-3">Take the next step</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Ready to find your next opportunity?</h2>
          <p className="text-white/90 max-w-3xl mb-6">
            Browse active vacancies or speak to our team for support with your search and application strategy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/jobs">Browse live jobs</Button>
            <Button href="/contact" variant="outlined">Speak to a recruiter</Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
