"use client";

import { useEffect, useState } from "react";

type InstagramPost = {
  id: string;
  caption?: string;
  media_url?: string;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  thumbnail_url?: string;
};

export default function InstagramFeedSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    fetch("/api/instagram")
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data) => {
        if (data.error) throw new Error();
        setPosts(data.posts ?? []);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

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
            href="https://instagram.com/_prositeuk/"
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-crimson px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-crimson/90 transition-colors shrink-0"
          >
            Visit Instagram
          </a>
        </div>

        {/* Loading skeletons */}
        {status === "loading" && (
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-md bg-white/5 animate-pulse" />
            ))}
          </div>
        )}

        {/* Posts */}
        {status === "success" && posts.length > 0 && (
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {posts.map((post) => {
              const image = post.media_url;
              if (!image) return null;
              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block aspect-[4/5] overflow-hidden rounded-md bg-charcoal"
                  title={post.caption?.slice(0, 100) || "Instagram post"}
                >
                  <img
                    src={image}
                    alt={post.caption?.slice(0, 100) || "Instagram post"}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm8.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 7a5 5 0 100 10 5 5 0 000-10z" />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Error / empty */}
        {(status === "error" || (status === "success" && posts.length === 0)) && (
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-sm text-white/50">
              {status === "error"
                ? "Could not load Instagram posts. Please check your access token."
                : "No posts to display yet."}
            </p>
            <a
              href="https://instagram.com/_prositeuk/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-xs text-crimson hover:text-crimson/80 underline underline-offset-2"
            >
              View on Instagram →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
