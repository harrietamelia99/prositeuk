import Link from "next/link";
import Button from "@/components/Button";
import JobMetaIcons from "@/components/JobMetaIcons";
import JobMap from "@/components/JobMap";
import PageShell from "@/components/PageShell";
import { getPublishedJobs } from "@/lib/crm-store";

export const dynamic = "force-dynamic";

export default async function JobsPage({
  searchParams
}: {
  searchParams?: { applied?: string };
}) {
  const jobs = await getPublishedJobs();

  return (
    <PageShell>
      <section className="bg-ink text-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <p className="uppercase tracking-[0.18em] text-sm text-white/70 mb-4">Jobs</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Current opportunities</h1>
        <p className="max-w-3xl text-white/85">Browse open roles across site engineering and construction and apply directly with your CV.</p>
      </section>

      <section>
        <JobMap />
      </section>

      <section className="bg-gradient-to-br from-[#efefef] via-white to-white py-12 sm:py-14 rounded-xl glass-outline-subtle">
      <div className="px-5 sm:px-7">
        <p className="text-charcoal/80 mb-8">Apply directly with your CV — our team reviews every application.</p>
        {searchParams?.applied === "1" ? (
          <div className="mb-6 rounded-md bg-white border border-charcoal/15 p-5 text-sm glass-outline-subtle">
            Application submitted successfully. Our team will review your details and be in touch.
          </div>
        ) : null}

        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="rounded-xl bg-white border border-charcoal/15 p-8 glass-outline-subtle">No jobs published yet.</div>
          ) : null}
          {jobs.map((job) => (
            <article key={job.id} className="rounded-xl bg-white border border-charcoal/15 p-5 sm:p-8 shadow-sm glass-outline-subtle">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">{job.title}</h2>
                </div>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="shrink-0 rounded-md bg-crimson px-4 sm:px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white"
                >
                  View and apply
                </Link>
              </div>
              <JobMetaIcons
                className="mt-4"
                location={job.location}
                salary={job.salary}
                employmentType={job.employmentType}
              />
              <p className="text-charcoal/85 mt-4">{job.description}</p>
            </article>
          ))}
        </div>
      </div>
      </section>

      <section className="rounded-xl overflow-hidden glass-outline-subtle">
        <div className="bg-gradient-to-br from-crimson/80 via-crimson/55 to-ink text-white p-8 sm:p-10">
          <p className="uppercase tracking-[0.16em] text-xs text-white/75 mb-3">Need support applying?</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Let us help you find the right fit</h2>
          <p className="text-white/90 max-w-3xl mb-6">
            Not sure which role suits you best? Contact our team and we&apos;ll guide you through your options.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">Speak to our team</Button>
            <Button href="/job-seekers" variant="outlined">Job seeker support</Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
