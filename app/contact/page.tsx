import Button from "@/components/Button";
import PageShell from "@/components/PageShell";

export default function ContactPage() {
  return (
    <PageShell>
      <section className="bg-ink text-white py-16 rounded-xl glass-outline-subtle">
        <div className="px-4 sm:px-6">
          <p className="uppercase tracking-[0.18em] text-sm text-white/70 mb-4">Get in touch</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Speak to PROSITEUK</h1>
          <p className="max-w-3xl text-white/85">
            Tell us whether you are hiring or looking for work and our team will respond promptly.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#efefef] via-white to-white py-12 sm:py-14 rounded-xl glass-outline-subtle">
        <div className="px-5 sm:px-7">
          <div className="grid gap-10 lg:grid-cols-2">
            <form className="relative overflow-hidden space-y-4 rounded-xl border border-charcoal/15 p-6 sm:p-9 shadow-sm bg-gradient-to-br from-[#efefef] via-white to-white glass-outline-subtle">
              <div className="pointer-events-none absolute -top-24 -left-20 h-52 w-52 rounded-full bg-crimson/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-14 h-56 w-56 rounded-full bg-ink/10 blur-3xl" />
              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.14em] text-charcoal/55 mb-1">Send a message</p>
                <h2 className="text-2xl font-bold mb-5">Let&apos;s talk</h2>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded-md border border-charcoal/20 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson/35 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-md border border-charcoal/20 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson/35 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full rounded-md border border-charcoal/20 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson/35 transition-colors"
                  placeholder="How can we help?"
                />
              </div>
              <div className="pt-1">
                <Button type="submit">Send message</Button>
              </div>
            </form>

            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-ink to-black text-white p-6 sm:p-9 glass-outline-subtle">
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-crimson/20 blur-3xl" />
                <h2 className="text-2xl font-bold mb-5 relative">Contact details</h2>
                <div className="space-y-3 text-white/90 relative">
                  <p className="flex items-start gap-2">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10 text-white/95 mt-[1px]">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="currentColor" />
                      </svg>
                    </span>
                    <span>255–259 Commercial Road, 2nd Floor,<br />Whitechapel, London E1 2BT</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10 text-white/95">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.9 19.9 0 013 4.2 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.4 2.1L9.2 9.8a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.8.3 1.7.6 2.6.7A2 2 0 0 1 22 16.9z" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                    <span>
                      <a href="tel:+447563707612" className="hover:text-white transition-colors">+44 7563 707612</a>
                      {" / "}
                      <a href="tel:+447783081431" className="hover:text-white transition-colors">+44 7783 081431</a>
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10 text-white/95">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                        <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                    <a href="mailto:info@prositeuk.com" className="hover:text-white transition-colors">info@prositeuk.com</a>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10 text-white/95 mt-[1px]">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 8v4l2.8 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Monday – Friday, 8:30am – 6:00pm
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-crimson to-[#520a09] text-white p-6 sm:p-9 glass-outline-subtle">
                <div className="pointer-events-none absolute -left-16 -bottom-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                <h3 className="text-xl font-semibold mb-2 relative">Quick WhatsApp enquiry</h3>
                <p className="text-white/90 mb-5 relative">
                  Prefer chat? Send a message and we will get back to you quickly.
                </p>
                <Button
                  href="https://wa.me/447563707612"
                  variant="outlined"
                  className="w-fit border-white/70 hover:border-white"
                  icon={
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5a8.5 8.5 0 01-12.8 7.3L3 20l1.2-5.1A8.5 8.5 0 1121 11.5z" />
                    </svg>
                  }
                >
                  Start WhatsApp Chat
                </Button>

                <div className="mt-6 pt-5 border-t border-white/20 relative">
                  <p className="text-xs text-white/60 uppercase tracking-widest mb-3">Follow us</p>
                  <div className="flex items-center gap-3">
                    <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn" className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 4a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" aria-label="Instagram" className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm8.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 7a5 5 0 100 10 5 5 0 000-10z" />
                      </svg>
                    </a>
                    <a href="https://facebook.com" target="_blank" aria-label="Facebook" className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3h-3a5 5 0 00-5 5v3H4v4h3v6h4v-6h3l1-4h-4V8a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl overflow-hidden glass-outline-subtle">
        <div className="bg-gradient-to-br from-crimson/80 via-crimson/55 to-ink text-white p-8 sm:p-10">
          <p className="uppercase tracking-[0.16em] text-xs text-white/75 mb-3">Prefer a quick start?</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Chat with us now</h2>
          <p className="text-white/90 max-w-3xl mb-6">
            If your requirement is urgent, message us directly and we&apos;ll respond as quickly as possible.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="https://wa.me/447563707612">Start WhatsApp chat</Button>
            <Button href="/jobs" variant="outlined">View live jobs</Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
