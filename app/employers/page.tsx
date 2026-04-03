import Image from "next/image";
import Button from "@/components/Button";
import PageShell from "@/components/PageShell";

type Service = {
  title: string;
  description: string;
  icon: "network" | "clock" | "target";
};

const services: Service[] = [
  {
    title: "Pre-qualified talent",
    description: "Quick access to vetted engineering and construction professionals.",
    icon: "network"
  },
  {
    title: "Flexible hiring model",
    description: "Support for temporary, contract and permanent recruitment needs.",
    icon: "clock"
  },
  {
    title: "Project-led approach",
    description: "A consultative process aligned with your site timelines and goals.",
    icon: "target"
  }
];

function ServiceIcon({ icon }: { icon: Service["icon"] }) {
  if (icon === "network") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <circle cx="6" cy="7" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="7" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="17" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7.9 8.2 10.1 15M16.1 8.2 13.9 15M8.3 7h7.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "clock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v4l2.8 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m12 7 1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export default function EmployersPage() {
  return (
    <PageShell>
      <section className="bg-ink text-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <div>
          <p className="uppercase tracking-[0.18em] text-sm text-white/70 mb-4">Employers</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Reliable recruitment support for growing teams</h1>
          <p className="max-w-3xl text-white/85">
            PROSITEUK helps employers secure dependable talent for engineering and construction projects of
            every scale.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#efefef] via-white to-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <div>
          <div className="grid gap-10 lg:grid-cols-2 items-stretch">
            <div>
              <p className="uppercase tracking-[0.16em] text-xs text-charcoal/60 mb-3">Employer support</p>
              <h2 className="text-3xl font-bold mb-3">Why employers choose us</h2>
              <p className="text-charcoal/75 mb-6">
                A modern recruitment partner focused on delivery speed and long-term fit.
              </p>
              <div className="space-y-3 mb-7">
                {services.map((service) => (
                  <article key={service.title} className="rounded-lg border border-charcoal/15 bg-offwhite p-4 sm:p-5 glass-outline-subtle">
                    <div className="flex items-start gap-3">
                      <span className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-crimson to-ink text-white flex items-center justify-center">
                        <ServiceIcon icon={service.icon} />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-charcoal">{service.title}</h3>
                        <p className="text-sm text-charcoal/75 mt-1">{service.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="rounded-lg border border-charcoal/15 bg-white p-4 sm:p-5 glass-outline-subtle">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-charcoal/75">Need urgent or planned support for your next hire?</p>
                  <Button href="/contact">Discuss your hiring needs</Button>
                </div>
              </div>
            </div>
            <div className="relative min-h-[18rem] sm:min-h-[24rem] lg:min-h-full rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
                alt="Construction team on site"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#efefef] via-white to-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <div>
          <p className="uppercase tracking-[0.16em] text-xs text-charcoal/60 mb-3">Delivery strengths</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Specialist recruitment across project-critical roles</h2>

          {/* Bento row 1: featured description card + dark project context card */}
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <div className="sm:col-span-2 rounded-xl border border-charcoal/15 bg-white p-6 sm:p-8 glass-outline-subtle flex flex-col justify-between gap-6">
              <div>
                <p className="text-charcoal/75 leading-relaxed max-w-xl">
                  Trusted by tier 1, 2 and 3 contractors for engineering-led placements and dependable site workforce support.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-charcoal/15 bg-offwhite px-3 py-1.5 text-xs font-medium text-charcoal/80">
                    Relationship-led delivery
                  </span>
                  <span className="inline-flex items-center rounded-full border border-charcoal/15 bg-offwhite px-3 py-1.5 text-xs font-medium text-charcoal/80">
                    Positive client feedback
                  </span>
                  <span className="inline-flex items-center rounded-full border border-charcoal/15 bg-offwhite px-3 py-1.5 text-xs font-medium text-charcoal/80">
                    Fast shortlist turnaround
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-2 border-t border-charcoal/10">
                <Button href="/contact">Discuss your hiring needs</Button>
                <a
                  href="/jobs"
                  className="inline-flex items-center rounded-md border border-crimson/30 bg-crimson/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-crimson transition-colors hover:bg-crimson/15"
                >
                  View live roles
                </a>
              </div>
            </div>

            <div className="rounded-xl bg-ink p-6 sm:p-8 glass-outline-subtle flex flex-col justify-between">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/40 mb-5">Project context</p>
              <div className="space-y-2 flex-1">
                <p className="text-xl font-semibold text-white leading-tight">Sizewell C</p>
                <p className="text-xl font-semibold text-white leading-tight">TfL</p>
                <p className="text-xl font-semibold text-white leading-tight">National Highways</p>
              </div>
              <p className="text-xs text-white/35 mt-6 leading-snug">Projects we have placed on</p>
            </div>
          </div>

          {/* Bento row 2: three equal stat cards */}
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 mt-3">
            <div className="rounded-xl border border-charcoal/15 bg-white p-5 sm:p-6 glass-outline-subtle">
              <p className="text-[11px] uppercase tracking-[0.14em] text-charcoal/45 mb-3">Core sectors</p>
              <p className="text-base font-semibold text-charcoal leading-snug">Site engineering, groundworks, plant ops</p>
            </div>
            <div className="rounded-xl border border-charcoal/15 bg-white p-5 sm:p-6 glass-outline-subtle">
              <p className="text-[11px] uppercase tracking-[0.14em] text-charcoal/45 mb-3">Most placed</p>
              <p className="text-base font-semibold text-charcoal leading-snug">Site and senior engineers</p>
            </div>
            <div className="rounded-xl border border-charcoal/15 bg-white p-5 sm:p-6 glass-outline-subtle">
              <p className="text-[11px] uppercase tracking-[0.14em] text-charcoal/45 mb-3">Replacements</p>
              <p className="text-base font-semibold text-charcoal leading-snug">0 required to date</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#efefef] via-white to-white p-8 sm:p-10 rounded-xl glass-outline-subtle">
        <div>
          <p className="uppercase tracking-[0.16em] text-xs text-charcoal/60 mb-3">Role coverage</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Blue collar and white collar recruitment</h2>
          <p className="text-charcoal/75 max-w-4xl mb-8">
            We support both workforce streams and shape shortlists around project phase, programme risk and site priorities.
          </p>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-lg border border-charcoal/15 bg-offwhite p-6 glass-outline-subtle">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-10 w-10 rounded-lg bg-gradient-to-br from-crimson to-ink text-white flex items-center justify-center">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <path d="M4 15.5 8.5 11l4 4 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.5 8H19v4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="text-xl font-semibold">White collar roles</h3>
              </div>
              <p className="text-sm text-charcoal/75 mb-4">
                Site engineering and technical placements with a focus on delivery ownership, quality and programme outcomes.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-charcoal/50 mb-2">Site engineering</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-md border border-charcoal/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80">Site engineer</span>
                    <span className="rounded-md border border-charcoal/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80">Senior engineer</span>
                    <span className="rounded-md border border-charcoal/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80">Project engineer</span>
                    <span className="rounded-md border border-charcoal/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80">Setting out engineer</span>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-charcoal/50 mb-2">Site management</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-md border border-charcoal/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80">Sub agent</span>
                    <span className="rounded-md border border-charcoal/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80">Site agent</span>
                    <span className="rounded-md border border-charcoal/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80">Project manager</span>
                    <span className="rounded-md border border-charcoal/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80">Contracts manager</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-lg border border-charcoal/15 bg-offwhite p-6 glass-outline-subtle">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-10 w-10 rounded-lg bg-gradient-to-br from-crimson to-ink text-white flex items-center justify-center">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <path d="M3.5 14.5 10 8l1.8 1.8L6.8 14.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="m12.2 10.2 3-3a2.2 2.2 0 1 1 3.1 3.1l-3 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="m9 12 3 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <h3 className="text-xl font-semibold">Blue collar roles</h3>
              </div>
              <p className="text-sm text-charcoal/75 mb-4">
                Site workforce recruitment to maintain productivity, safety standards and day-to-day programme momentum.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md border border-charcoal/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80">Groundworker</span>
                <span className="rounded-md border border-charcoal/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80">Plant operative</span>
                <span className="rounded-md border border-charcoal/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80">Civils operative</span>
                <span className="rounded-md border border-charcoal/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80">Site support crew</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="rounded-xl overflow-hidden glass-outline-subtle">
        <div className="bg-gradient-to-br from-crimson/80 via-crimson/55 to-ink text-white p-8 sm:p-10">
          <p className="uppercase tracking-[0.16em] text-xs text-white/75 mb-3">Build your team</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Need project-ready talent quickly?</h2>
          <p className="text-white/90 max-w-3xl mb-6">
            We provide fast, reliable support for engineering and site workforce hiring across major UK projects.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">Discuss your hiring needs</Button>
            <Button href="/jobs" variant="outlined">View current roles</Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
