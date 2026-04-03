import Link from "next/link";
import Logo from "./Logo";
import SectionWrapper from "./SectionWrapper";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/job-seekers", label: "Job Seekers" },
  { href: "/employers", label: "Employers" }
];

const connectLinks = [
  { href: "/contact", label: "Enquire" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://www.facebook.com/profile.php?id=61571225233602", label: "Facebook" }
];

function SocialIcon({ path }: { path: string }) {
  return (
    <span className="h-8 w-8 inline-flex items-center justify-center text-crimson">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={path} />
      </svg>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink pb-6">
      <SectionWrapper>
        <div className="rounded-xl bg-gradient-to-br from-[#efefef] via-white to-white text-charcoal p-6 sm:p-8 md:p-10 glass-outline-subtle">
          <div className="grid grid-cols-2 gap-y-6 gap-x-6 md:grid-cols-3 lg:grid-cols-4">

            {/* Logo + tagline + socials */}
            <div className="col-span-2 md:col-span-1 space-y-3 lg:max-w-[18rem]">
              <Logo withLink={false} size="footer" className="w-fit" />
              <p className="text-sm leading-snug max-w-[14rem] text-charcoal/70">
                Construction Recruitment Agency.
              </p>
              <div className="flex items-center gap-1">
                <Link href="https://www.linkedin.com/company/prositeuk/" aria-label="LinkedIn" target="_blank">
                  <SocialIcon path="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 4a2 2 0 100 4 2 2 0 000-4z" />
                </Link>
                <Link href="https://www.instagram.com/_prositeuk/" aria-label="Instagram" target="_blank">
                  <SocialIcon path="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm8.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 7a5 5 0 100 10 5 5 0 000-10z" />
                </Link>
                <Link href="https://www.facebook.com/people/Prositeuk/61571225233602/" aria-label="Facebook" target="_blank">
                  <SocialIcon path="M15 3h-3a5 5 0 00-5 5v3H4v4h3v6h4v-6h3l1-4h-4V8a1 1 0 011-1h3z" />
                </Link>
              </div>
            </div>

            {/* Explore */}
            <div className="lg:pl-2">
              <h3 className="text-crimson text-xs font-semibold uppercase tracking-wide mb-2.5">Explore</h3>
              <ul className="space-y-2">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-charcoal/80 hover:text-crimson transition-colors duration-200 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="lg:pl-2">
              <h3 className="text-crimson text-xs font-semibold uppercase tracking-wide mb-2.5">Connect</h3>
              <ul className="space-y-2">
                {connectLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-charcoal/80 hover:text-crimson transition-colors duration-200 inline-block" target={link.href.startsWith("http") ? "_blank" : "_self"}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1 pt-2 md:pt-0 border-t border-charcoal/10 md:border-t-0 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-crimson mt-0.5 shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
                <span className="text-charcoal/70 leading-snug">255–259 Commercial Road, 2nd Floor, Whitechapel, London E1 2BT</span>
              </div>
              <div className="flex items-center gap-2">
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-crimson shrink-0">
                  <path d="M22 16.9v3a2 2 0 01-2.2 2A19.9 19.9 0 013 4.2 2 2 0 015 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.6a2 2 0 01-.4 2.1L9.2 9.8a16 16 0 006 6l1.4-1.4a2 2 0 012.1-.4c.8.3 1.7.6 2.6.7A2 2 0 0122 16.9z" />
                </svg>
                <a href="tel:+447563707612" className="text-charcoal/70 hover:text-crimson transition-colors">+44 7563 707612</a>
                <span className="text-charcoal/40">·</span>
                <a href="tel:+447783081431" className="text-charcoal/70 hover:text-crimson transition-colors">+44 7783 081431</a>
              </div>
              <div className="flex items-center gap-2">
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-crimson shrink-0">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                <a href="mailto:info@prositeuk.com" className="text-charcoal/70 hover:text-crimson transition-colors">info@prositeuk.com</a>
              </div>
            </div>

          </div>
        </div>
      </SectionWrapper>
      <div className="border-t border-white/15 mt-6">
        <SectionWrapper className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
            <p className="text-xs text-white/70">© {new Date().getFullYear()} PROSITEUK. All rights reserved.</p>
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">Privacy policy</Link>
          </div>
          <p className="text-xs text-white/40">
            Site designed by{" "}
            <a
              href="https://www.collectivstudio.uk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              www.collectivstudio.uk
            </a>
          </p>
        </SectionWrapper>
      </div>
    </footer>
  );
}
