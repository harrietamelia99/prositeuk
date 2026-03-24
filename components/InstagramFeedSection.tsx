import { getInstagramFeed } from "@/lib/instagram-feed";

export default async function InstagramFeedSection() {
  const posts = await getInstagramFeed(6);
  const hasFeed = posts.length > 0;

  return (
    <section className="bg-gradient-to-br from-ink to-charcoal py-12 sm:py-14 rounded-xl border border-charcoal/20 glass-outline-subtle">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Follow us on <span className="text-white">socials</span>
            </h2>
            <p className="text-white/75 mt-2">See our latest updates, jobs, and behind-the-scenes content.</p>
          </div>
          <a
            href="https://instagram.com/_prositeuk/"
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-crimson px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-crimson/90 transition-colors"
          >
            Visit Instagram
          </a>
        </div>

        {hasFeed ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {posts.map((post) => {
              const image = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;
              if (!image) return null;
              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg overflow-hidden bg-offwhite border border-charcoal/20 glass-outline-subtle block"
                >
                  <img
                    src={image}
                    alt={post.caption?.slice(0, 100) || "Instagram post"}
                    className="h-40 sm:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </a>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-charcoal/20 bg-offwhite p-6 glass-outline-subtle">
            <p className="text-sm text-charcoal/80">
              Instagram feed will appear here once your access token is connected.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
