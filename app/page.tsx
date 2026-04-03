import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import InstagramFeedSection from "@/components/InstagramFeedSection";
import ScrollReveal from "@/components/ScrollReveal";
import SectionWrapper from "@/components/SectionWrapper";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import { getPublishedJobs } from "@/lib/crm-store";

function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-12 w-12 rounded-md bg-crimson text-white inline-flex items-center justify-center">
      {children}
    </div>
  );
}

export default async function HomePage() {
  const liveJobs = (await getPublishedJobs()).slice(0, 3);

  return (
    <div className="bg-ink pt-6 sm:pt-7 pb-5 sm:pb-7" data-dark>
      <SectionWrapper className="space-y-6 sm:space-y-7">
        <ScrollReveal>
        <section className="rounded-xl bg-ink/40 glass-outline-subtle">
          <div className="relative min-h-[50vh] sm:min-h-[68vh] text-white overflow-hidden rounded-xl">
            {/* London skyline background video - place your video at /public/hero-video.mp4 */}
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-50 saturate-0 contrast-150"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            {/* Gradient overlays on top of video */}
            <div className="absolute inset-0 bg-ink/50" />
            <div className="absolute inset-0 bg-gradient-to-br from-crimson/40 via-crimson/20 to-ink/75" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(112,14,13,0.35),transparent_45%),radial-gradient(circle_at_78%_75%,rgba(112,14,13,0.22),transparent_40%)]" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-charcoal/20" />
            <div className="relative py-12 sm:py-20 min-h-[50vh] sm:min-h-[68vh] flex items-center justify-center">
            <div className="text-center max-w-3xl px-4">
              <p className="text-[11px] sm:text-xs tracking-[0.16em] uppercase font-medium text-white/85 mb-4 animate-[fade_500ms_ease-out]">
                Construction Recruitment
              </p>
              <h1 className="text-[1.8rem] sm:text-4xl md:text-5xl font-bold leading-[1.06] mb-7 animate-[fade_650ms_ease-out]">
                Bringing <span className="text-white">skilled talent</span> and businesses together to create
                the <span className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">perfect fit</span>.
              </h1>
              <div className="flex items-center justify-center gap-3 flex-wrap animate-[fade_800ms_ease-out]">
                <Button href="/contact">Get In Touch</Button>
                <Button href="#about-intro" variant="outlined">
                  Find Out More
                </Button>
              </div>

              <div className="mt-8 mx-auto max-w-2xl rounded-lg border border-charcoal/20 bg-white/5 backdrop-blur-sm px-5 py-3 animate-[fade_950ms_ease-out] glass-outline-subtle">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <p className="text-[11px] sm:text-sm text-white/85 leading-snug"><span className="font-semibold text-white block">UK-wide</span> placements</p>
                  <p className="text-[11px] sm:text-sm text-white/85 leading-snug"><span className="font-semibold text-white block">Fast</span> turnaround</p>
                  <p className="text-[11px] sm:text-sm text-white/85 leading-snug"><span className="font-semibold text-white block">Trusted</span> partner</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center text-white/60">
              <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
              <span className="mt-1 h-8 w-[1px] bg-white/35 relative overflow-hidden">
                <span className="absolute left-0 top-0 h-3 w-[1px] bg-white animate-[pulse_1.4s_ease-in-out_infinite]" />
              </span>
            </div>
          </div>
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
        <section className="bg-offwhite py-5 sm:py-6 rounded-xl glass-outline-subtle">
          <div className="grid gap-4 md:grid-cols-2 px-5 sm:px-6">
            <TiltCard className="bg-gradient-to-br from-[#efefef] via-white to-white rounded-lg p-8 glass-outline-subtle shadow-sm">
              <IconTile>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M17 11h6" />
                </svg>
              </IconTile>
              <h3 className="mt-4 text-[1.7rem] sm:text-[2rem] leading-none font-bold">Looking to recruit?</h3>
              <p className="mt-3 text-sm text-charcoal/80">
                From temporary workers to permanent hires, we&apos;re here to find you the perfect fit for
                your requirements.
              </p>
              <div className="mt-5">
                <Button href="/employers">Take Me There</Button>
              </div>
            </TiltCard>

            <TiltCard className="bg-gradient-to-br from-[#efefef] via-white to-white rounded-lg p-8 glass-outline-subtle shadow-sm">
              <IconTile>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </IconTile>
              <h3 className="mt-4 text-[1.7rem] sm:text-[2rem] leading-none font-bold">Looking for work?</h3>
              <p className="mt-3 text-sm text-charcoal/80">
                Whether you&apos;re actively looking for work, or keen to find out about the latest
                opportunities, we&apos;ve got you covered.
              </p>
              <div className="mt-5">
                <Button href="/jobs">Take Me There</Button>
              </div>
            </TiltCard>
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal delayMs={120}>
        <section id="about-intro" className="relative text-white rounded-xl overflow-hidden glass-outline-subtle" data-dark>
          <Image
            src="/london-skyline.png"
            alt="London city skyline with the Gherkin"
            fill
            className="object-cover object-center opacity-60 saturate-50 contrast-110"
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 to-ink/45" />
          <div className="relative py-12 sm:py-14 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-5">
                Expertly placed by those who know the industry best
              </h2>
              <p className="text-white/90 mb-2.5">
                We take pride in delivering a first-class, personable and authentic approach to both clients
                and candidates.
              </p>
              <p className="text-white/90 mb-7">
                By truly understanding the needs of each, we connect the right people with the right
                opportunities across the UK site engineering and construction sectors.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Button href="/about">About Us</Button>
                <Button href="/contact" variant="outlined">
                  Book A Call
                </Button>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal delayMs={130}>
        <section className="bg-ink rounded-xl glass-outline-subtle overflow-hidden relative py-10 sm:py-12" data-dark>
          <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {[
              { target: 50, suffix: "+", label: "Placements made" },
              { target: 0, suffix: "", label: "No replacements" },
              { target: 100, suffix: "%", label: "Repeat clients" },
              { target: 3, suffix: "+", label: "Years active" },
            ].map(({ target, suffix, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-7 px-3 bg-ink">
                <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight tabular-nums">
                  <CountUp target={target} suffix={suffix} />
                </span>
                <span className="mt-2 text-[10px] sm:text-xs text-white/50 uppercase tracking-wide sm:tracking-widest text-center leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal delayMs={140}>
        <section className="text-white py-12 sm:py-14 rounded-xl overflow-hidden relative glass-outline-subtle">
          <div className="absolute inset-0 bg-gradient-to-br from-crimson/75 via-crimson/45 to-ink" />
          <div className="relative z-10 max-w-3xl mx-auto text-center px-6 sm:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Register for job alerts</h2>
            <p className="text-sm sm:text-base text-white mb-6 sm:mb-8">
              Whether you&apos;re actively seeking a new opportunity in site engineering or construction,
              or keen to be kept informed of roles that match your skills in the near future, register your
              details with us today.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto px-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-sm px-4 py-3 text-charcoal focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-sm bg-white text-ink px-6 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-offwhite transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal delayMs={160}>
        <section className="bg-gradient-to-br from-[#efefef] via-white to-white py-12 sm:py-14 rounded-xl glass-outline-subtle">
          <div className="px-5 sm:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-crimson text-center mb-7">Client testimonials</h2>
            <TestimonialsCarousel />
          </div>
        </section>
        </ScrollReveal>

        <InstagramFeedSection />

        <ScrollReveal delayMs={170}>
        <section className="bg-gradient-to-br from-[#efefef] via-white to-white py-12 sm:py-14 rounded-xl glass-outline-subtle">
          <div className="px-5 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-charcoal">Live jobs</h2>
                <p className="text-charcoal/75 mt-2">
                  Explore our latest opportunities and click through to apply.
                </p>
              </div>
              <Button href="/jobs">View full job board</Button>
            </div>

            <div className="space-y-3">
              {liveJobs.length === 0 ? (
                <div className="rounded-lg border border-charcoal/15 bg-offwhite p-7 glass-outline-subtle">
                  <p className="text-sm text-charcoal/80">No live jobs are published right now. Check back soon.</p>
                </div>
              ) : null}
              {liveJobs.map((job) => (
                <article key={job.id} className="rounded-lg border border-charcoal/15 bg-offwhite p-6 glass-outline-subtle">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <p className="text-sm text-charcoal/70 mt-1">
                        {job.location} • {job.employmentType} • {job.salary}
                      </p>
                    </div>
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="rounded-md bg-crimson px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
                    >
                      View role
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal delayMs={180}>
        <section className="rounded-xl p-0 glass-outline-subtle">
          <div className="grid md:grid-cols-2 group rounded-xl overflow-hidden">
            <div className="relative text-white p-7 sm:p-8 md:p-10 flex flex-col justify-center bg-ink overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-crimson/45 via-crimson/25 to-ink" />
              <div className="relative z-10">
              <h2 className="text-[2rem] sm:text-3xl font-bold mb-4">Hiring? Start the conversation</h2>
              <p className="text-white/85 mb-6">
                Drop us a message on WhatsApp and we&apos;ll get back to you promptly.
              </p>
              <Link
                href="https://wa.me/447563707612"
                className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-4 sm:px-5 py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-crimson transition-colors hover:bg-offwhite"
              >
                Contact Us On WhatsApp
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 11.5a8.5 8.5 0 01-12.8 7.3L3 20l1.2-5.1A8.5 8.5 0 1121 11.5z" />
                </svg>
              </Link>
              </div>
            </div>
            <div className="relative min-h-[280px] md:min-h-[360px] overflow-hidden">
              <Image
                src="/hiring-worker.png"
                alt="Engineer on site at wind farm"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </section>
        </ScrollReveal>
      </SectionWrapper>
    </div>
  );
}
