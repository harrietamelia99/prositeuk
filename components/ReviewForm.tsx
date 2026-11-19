"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import Button from "@/components/Button";

export type ReviewerType = "client" | "candidate" | "placement" | "";

const options: { value: Exclude<ReviewerType, "">; label: string; sub: string }[] = [
  { value: "client", label: "Client", sub: "You've hired through PROSITEUK" },
  { value: "candidate", label: "Candidate", sub: "We've helped you find work" },
  { value: "placement", label: "Worker on placement", sub: "You're on site through us now" },
];

type ReviewFormProps = {
  initialName?: string;
  initialType?: ReviewerType;
};

export default function ReviewForm({ initialName = "", initialType = "" }: ReviewFormProps) {
  const [firstName, setFirstName] = useState(initialName);
  const [reviewerType, setReviewerType] = useState<ReviewerType>(initialType);
  const [company, setCompany] = useState("");
  const [review, setReview] = useState("");
  const [canPublish, setCanPublish] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, reviewerType, company, review, canPublish, turnstileToken }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong, please try again.");
        setStatus("error");
      }
    } catch {
      setError("Something went wrong, please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-6">
        <p className="text-3xl mb-3 text-crimson">✓</p>
        <p className="font-semibold text-xl text-charcoal mb-2">Thank you, {firstName}.</p>
        <p className="text-charcoal/70">Your review has been sent to the PROSITEUK team. We really appreciate you taking the time.</p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-md border border-charcoal/20 bg-white/80 px-4 py-3 text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson/35 transition-colors";
  const labelCls = "text-xs uppercase tracking-widest text-charcoal/50 font-semibold";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 max-w-2xl">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="firstName" className={labelCls}>First name *</label>
        <input
          id="firstName"
          type="text"
          placeholder="Your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          autoComplete="given-name"
          className={inputCls}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className={labelCls}>I am a *</span>
        <div className="grid sm:grid-cols-3 gap-3">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              aria-pressed={reviewerType === opt.value}
              onClick={() => setReviewerType(opt.value)}
              className={`rounded-md border px-4 py-3 text-left transition-colors ${
                reviewerType === opt.value
                  ? "border-crimson bg-crimson/5 text-charcoal ring-1 ring-crimson/30"
                  : "border-charcoal/20 bg-white text-charcoal hover:border-charcoal/40 hover:bg-charcoal/5"
              }`}
            >
              <p className="text-sm font-semibold">{opt.label}</p>
              <p className="text-xs mt-0.5 text-charcoal/50">{opt.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {reviewerType === "client" && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className={labelCls}>
            Company or project <span className="normal-case tracking-normal font-normal opacity-60">(optional)</span>
          </label>
          <input
            id="company"
            type="text"
            placeholder="e.g. your company or the scheme we supplied"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputCls}
          />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="review" className={labelCls}>Your review *</label>
        <textarea
          id="review"
          rows={6}
          placeholder="How was your experience working with PROSITEUK?"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          minLength={10}
          maxLength={3000}
          className={`${inputCls} resize-y`}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-charcoal/80 cursor-pointer">
        <input
          type="checkbox"
          checked={canPublish}
          onChange={(e) => setCanPublish(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#700e0d]"
        />
        <span>I&apos;m happy for PROSITEUK to share my first name and review on its website, social media and with new clients.</span>
      </label>

      <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} onSuccess={setTurnstileToken} />

      <div>
        <Button
          type="submit"
          disabled={status === "loading" || !reviewerType || !turnstileToken}
        >
          {status === "loading" ? "Sending…" : "Send my review"}
        </Button>
        {status === "error" && <p className="text-xs mt-2 text-crimson">{error}</p>}
      </div>
    </form>
  );
}
