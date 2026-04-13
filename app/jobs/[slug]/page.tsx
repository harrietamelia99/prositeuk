import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import JobMetaIcons from "@/components/JobMetaIcons";
import PageShell from "@/components/PageShell";
import { getJobBySlug } from "@/lib/crm-store";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await getJobBySlug(params.slug);
  if (!job || job.status !== "published") notFound();

  return (
    <PageShell>
      <section className="bg-gradient-to-br from-[#efefef] via-white to-white py-10 rounded-xl glass-outline-subtle">
      <div className="px-5 sm:px-7 space-y-6">
        <Link href="/jobs" className="text-sm underline text-charcoal/80">
          Back to job board
        </Link>

        <div className="rounded-xl bg-white border border-charcoal/15 p-8 shadow-sm glass-outline-subtle">
          <h1 className="text-4xl font-bold">{job.title}</h1>
          <JobMetaIcons
            className="mt-4"
            location={job.location}
            salary={job.salary}
            employmentType={job.employmentType}
          />
          <p className="text-charcoal/85 mt-5">{job.description}</p>
        </div>

        <div className="min-w-0 rounded-xl bg-white border border-charcoal/15 p-8 shadow-sm glass-outline-subtle">
          <h2 className="text-2xl font-bold mb-4">Apply for this role</h2>
          <form
            action="/api/apply"
            method="post"
            encType="multipart/form-data"
            className="grid min-w-0 md:grid-cols-2 gap-4"
          >
            <input type="hidden" name="jobId" value={job.id} />
            <input type="hidden" name="jobTitle" value={job.title} />

            <input
              name="candidateName"
              placeholder="Full name"
              className="min-w-0 w-full rounded-md border border-charcoal/20 px-4 py-3"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="min-w-0 w-full rounded-md border border-charcoal/20 px-4 py-3"
              required
            />
            <input
              name="phone"
              placeholder="Phone number"
              className="min-w-0 w-full rounded-md border border-charcoal/20 px-4 py-3"
              required
            />
            <input
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              className="min-w-0 w-full max-w-full rounded-md border border-charcoal/20 px-4 py-3 file:mr-3 file:rounded file:border-0 file:bg-charcoal/10 file:px-3 file:py-1 file:text-xs file:font-semibold"
            />

            <textarea
              name="message"
              placeholder="Tell us about your experience"
              className="min-w-0 w-full rounded-md border border-charcoal/20 px-4 py-3 md:col-span-2 min-h-[140px]"
              required
            />
            <button type="submit" className="w-fit rounded-md bg-crimson px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white">
              Submit Application
            </button>
          </form>
        </div>
      </div>
      </section>

      <section className="rounded-xl overflow-hidden glass-outline-subtle">
        <div className="bg-gradient-to-br from-crimson/80 via-crimson/55 to-ink text-white p-8 sm:p-10">
          <p className="uppercase tracking-[0.16em] text-xs text-white/75 mb-3">Need help with your application?</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Speak with our recruiters</h2>
          <p className="text-white/90 max-w-3xl mb-6">
            If you want guidance before applying, we&apos;re happy to discuss this role and similar opportunities.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">Contact us</Button>
            <Button href="/jobs" variant="outlined">Back to all jobs</Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
