import Image from "next/image";

const POSTS = [
  { src: "/insta-1.png", alt: "PROSITEUK – Connecting Clients, Rewarding Referrals" },
  { src: "/insta-2.png", alt: "PROSITEUK – Construction humour" },
  { src: "/insta-3.png", alt: "PROSITEUK – Our new website is now live" },
];

export default function InstagramFeedSection() {
  return (
    <section
      className="bg-gradient-to-br from-ink to-charcoal py-12 sm:py-14 rounded-xl border border-charcoal/20 glass-outline-subtle"
      data-dark
    >
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Follow us on socials</h2>
            <p className="text-white/75 mt-2">See our latest updates, jobs, and behind-the-scenes content.</p>
          </div>
          <a
            href="https://www.instagram.com/_prositeuk/"
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-crimson px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-crimson/90 transition-colors shrink-0"
          >
            Visit Instagram
          </a>
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {POSTS.map((post) => (
            <a
              key={post.src}
              href="https://www.instagram.com/_prositeuk/"
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-[4/5] overflow-hidden rounded-md bg-charcoal"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm8.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
