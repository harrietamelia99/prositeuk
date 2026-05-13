"use client";

import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!turnstileToken) return;
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set("cf-turnstile-response", turnstileToken);

    const res = await fetch("/api/apply", { method: "POST", body: formData });
    if (res.redirected) {
      window.location.href = res.url;
    } else {
      setSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="grid min-w-0 md:grid-cols-2 gap-4"
    >
      <input type="hidden" name="jobId" value={jobId} />
      <input type="hidden" name="jobTitle" value={jobTitle} />

      {/* Honeypot — hidden from real users, bots fill it in */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      />

      <input
        name="candidateName"
        placeholder="Full name"
        className="min-w-0 w-full rounded-md border border-charcoal/20 px-4 py-3"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email address"
        className="min-w-0 w-full rounded-md border border-charcoal/20 px-4 py-3"
        required
      />
      <input
        name="phone"
        placeholder="Phone number"
        className="min-w-0 w-full rounded-md border border-charcoal/20 px-4 py-3"
        required
      />
      <input
        type="file"
        name="cv"
        accept=".pdf,.doc,.docx"
        className="min-w-0 w-full max-w-full rounded-md border border-charcoal/20 px-4 py-3 file:mr-3 file:rounded file:border-0 file:bg-charcoal/10 file:px-3 file:py-1 file:text-xs file:font-semibold"
      />
      <textarea
        name="message"
        placeholder="Tell us about your experience"
        className="min-w-0 w-full rounded-md border border-charcoal/20 px-4 py-3 md:col-span-2 min-h-[140px]"
        required
      />

      <div className="md:col-span-2">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={setTurnstileToken}
        />
      </div>

      <button
        type="submit"
        disabled={!turnstileToken || submitting}
        className="w-fit rounded-md bg-crimson px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        {submitting ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
