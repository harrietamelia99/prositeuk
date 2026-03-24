"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/job-seekers", label: "Job Seekers" },
  { href: "/employers", label: "Employers" }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasShadow(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-transparent py-2 sm:py-3 transition-all duration-200 relative after:content-[''] after:absolute after:left-0 after:right-0 after:top-full after:h-4 after:bg-gradient-to-b after:from-black/16 after:to-transparent after:pointer-events-none ${
        hasShadow ? "after:opacity-100" : "after:opacity-0"
      }`}
    >
      <nav className="max-w-7xl xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`h-14 sm:h-16 md:h-[76px] px-4 sm:px-6 md:px-7 rounded-xl bg-gradient-to-br from-[#efefef] via-white to-white glass-outline-subtle flex items-center justify-between transition-shadow duration-200 ${
            hasShadow ? "shadow-[0_12px_20px_-12px_rgba(0,0,0,0.45)]" : ""
          }`}
        >
          <Logo className="shrink-0" />

          <ul className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.95rem] font-semibold uppercase tracking-normal text-charcoal hover:text-crimson transition-colors duration-200 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-crimson after:transition-all after:duration-200 hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button href="/contact" className="px-6 lg:px-8 py-2.5 lg:py-3 text-[0.88rem] lg:text-[0.95rem] rounded-lg">
              Get In Touch
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6H21M3 12H21M3 18H21" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="lg:hidden fixed inset-x-4 top-[78px] sm:top-[92px] bg-gradient-to-br from-[#efefef] via-white to-white rounded-xl shadow-xl glass-outline-subtle z-40">
          <div className="max-w-7xl xl:max-w-[1380px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg uppercase tracking-wide font-medium text-charcoal"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div>
              <Button href="/contact">Get In Touch</Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
