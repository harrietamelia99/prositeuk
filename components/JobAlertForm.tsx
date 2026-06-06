"use client";

import { useState } from "react";

export default function JobAlertForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/job-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-white/90 text-sm font-medium py-4">
        ✓ You&apos;re registered — we&apos;ll be in touch when a suitable role comes up.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto px-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-sm px-4 py-3 text-charcoal focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-sm bg-white text-ink px-6 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-offwhite transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Submit"}
      </button>
      {status === "error" && (
        <p className="text-white/70 text-xs mt-1 sm:col-span-2">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
