import Link from "next/link";
import PageShell from "@/components/PageShell";
import { getAllApplications, getAllJobs } from "@/lib/crm-store";
import { ApplicationStatus } from "@/lib/crm-types";
import {
  updateApplicationNotesAction,
  updateApplicationStatusAction,
} from "./actions";

const statusOrder: ApplicationStatus[] = ["new", "screened", "interview", "offer", "hired", "rejected"];

const statusLabel: Record<ApplicationStatus, string> = {
  new: "New",
  screened: "Screened",
  interview: "Interview",
  offer: "Offer",
  hired: "Hired",
  rejected: "Rejected"
};

export default async function AdminPage() {
  const [jobs, applications] = await Promise.all([getAllJobs(), getAllApplications()]);

  return (
    <PageShell>
      <section className="bg-gradient-to-br from-[#efefef] via-white to-white py-10 rounded-xl glass-outline-subtle">
      <div className="px-5 sm:px-7 space-y-8">
        <header className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-bold">CRM dashboard</h1>
            <p className="text-charcoal/80 mt-2">Post jobs, review applications, and move candidates through your pipeline.</p>
          </div>
          <Link href="/jobs" className="rounded-md bg-crimson px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white">
            View public job board
          </Link>
        </header>

        <section className="bg-gradient-to-br from-[#efefef] via-white to-white rounded-xl p-8 shadow-sm border border-charcoal/15 glass-outline-subtle">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold">Live jobs</h2>
              <p className="text-sm text-charcoal/70 mt-1">Jobs are managed in Sanity Studio. Click below to add, edit or remove listings.</p>
            </div>
            <Link href="/studio" className="rounded-md bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white">
              Open Sanity Studio →
            </Link>
          </div>
          <div className="space-y-3">
            {jobs.length === 0 && (
              <p className="text-sm text-charcoal/60">No published jobs yet. Add one in Sanity Studio.</p>
            )}
            {jobs.map((job) => (
              <div key={job.id} className="rounded-lg border border-charcoal/15 p-5 flex flex-wrap items-center justify-between gap-3 glass-outline-subtle">
                <div>
                  <p className="font-semibold">{job.title}</p>
                  <p className="text-sm text-charcoal/70">{job.location} · {job.employmentType} · {job.salary}</p>
                </div>
                <span className="rounded-full bg-green-100 text-green-800 text-xs font-medium px-3 py-1">{job.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Candidate pipeline</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {statusOrder.map((status) => {
              const grouped = applications.filter((item) => item.status === status);
              return (
                <div key={status} className="bg-gradient-to-br from-[#efefef] via-white to-white rounded-xl p-6 shadow-sm border border-charcoal/15 glass-outline-subtle">
                  <h3 className="font-bold text-lg mb-3">{statusLabel[status]} ({grouped.length})</h3>
                  <div className="space-y-3">
                    {grouped.length === 0 ? <p className="text-sm text-charcoal/60">No candidates in this stage.</p> : null}
                    {grouped.map((application) => (
                      <article key={application.id} className="rounded-lg border border-charcoal/15 p-5 glass-outline-subtle">
                        <p className="font-semibold">{application.candidateName}</p>
                        <p className="text-xs text-charcoal/70">{application.jobTitle}</p>
                        <p className="text-xs mt-1">{application.email}</p>
                        <p className="text-xs">{application.phone}</p>
                        <p className="text-xs mt-2 text-charcoal/80">{application.message}</p>
                        <a href={application.cvUrl} target="_blank" className="inline-block mt-2 text-xs underline text-crimson">
                          View CV
                        </a>

                        <form action={updateApplicationStatusAction} className="mt-3 flex items-center gap-2">
                          <input type="hidden" name="applicationId" value={application.id} />
                          <select name="status" defaultValue={application.status} className="rounded-md border border-charcoal/20 px-2 py-1.5 text-xs w-full">
                            {statusOrder.map((statusValue) => (
                              <option value={statusValue} key={statusValue}>
                                {statusLabel[statusValue]}
                              </option>
                            ))}
                          </select>
                          <button type="submit" className="rounded-md bg-ink px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            Move
                          </button>
                        </form>

                        <form action={updateApplicationNotesAction} className="mt-2">
                          <input type="hidden" name="applicationId" value={application.id} />
                          <textarea
                            name="notes"
                            defaultValue={application.notes}
                            placeholder="Recruiter notes"
                            className="w-full rounded-md border border-charcoal/20 px-2 py-1.5 text-xs min-h-[70px]"
                          />
                          <button type="submit" className="mt-2 rounded-md bg-crimson px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            Save Notes
                          </button>
                        </form>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      </section>
    </PageShell>
  );
}
