"use client";

import { useState } from "react";
import Button from "@/components/Button";

interface Fields {
  name: string;
  email: string;
  phone: string;
  collarPreference: string;
  location: string;
}

export default function JobAlertForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    phone: "",
    collarPreference: "",
    location: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/job-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const isLight = variant === "light";

  if (status === "success") {
    return (
      <div className={`py-6 ${isLight ? "text-charcoal" : "text-center"}`}>
        <p className="text-2xl mb-2">✓</p>
        <p className={`font-semibold text-base mb-1 ${isLight ? "text-charcoal" : "text-white"}`}>You&apos;re registered!</p>
        <p className={`text-sm ${isLight ? "text-charcoal/60" : "text-white/70"}`}>We&apos;ll be in touch when a suitable role comes up. Check your inbox for a confirmation.</p>
      </div>
    );
  }

  const inputCls = isLight
    ? "w-full rounded-md border border-charcoal/20 bg-white/80 px-4 py-3 text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson/35 transition-colors"
    : "w-full rounded-sm bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors";

  const labelCls = isLight
    ? "text-xs uppercase tracking-widest text-charcoal/50 font-semibold"
    : "text-xs uppercase tracking-widest text-white/50 font-semibold";

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 max-w-2xl">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Name *</label>
        <input
          type="text"
          placeholder="Your full name"
          value={fields.name}
          onChange={(e) => update("name", e.target.value)}
          required
          className={inputCls}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Email *</label>
        <input
          type="email"
          placeholder="your@email.com"
          value={fields.email}
          onChange={(e) => update("email", e.target.value)}
          required
          className={inputCls}
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Phone <span className="normal-case tracking-normal font-normal opacity-60">(optional)</span></label>
        <input
          type="tel"
          placeholder="+44 7700 000000"
          value={fields.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Location */}
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Preferred location <span className="normal-case tracking-normal font-normal opacity-60">(optional)</span></label>
        <input
          type="text"
          placeholder="e.g. London, South East"
          value={fields.location}
          onChange={(e) => update("location", e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Role preference — full width */}
      <div className="sm:col-span-2 flex flex-col gap-2">
        <label className={labelCls}>Role preference *</label>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { value: "blue", label: "Blue Collar", sub: "Groundworkers, labourers & plant operators" },
            { value: "white", label: "White Collar", sub: "Site engineers & project management" },
            { value: "both", label: "Both", sub: "Open to all roles" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update("collarPreference", opt.value)}
              className={`rounded-md border px-4 py-3 text-left transition-colors ${
                isLight
                  ? fields.collarPreference === opt.value
                    ? "border-crimson bg-crimson/5 text-charcoal ring-1 ring-crimson/30"
                    : "border-charcoal/20 bg-white text-charcoal hover:border-charcoal/40 hover:bg-charcoal/5"
                  : fields.collarPreference === opt.value
                    ? "border-white bg-white/20 text-white"
                    : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/35"
              }`}
            >
              <p className="text-sm font-semibold">{opt.label}</p>
              <p className={`text-xs mt-0.5 ${isLight ? "text-charcoal/50" : "text-white/50"}`}>{opt.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Submit — full width */}
      <div className="sm:col-span-2">
        <Button
          type="submit"
          disabled={status === "loading" || !fields.collarPreference}
        >
          {status === "loading" ? "Registering…" : "Register for job alerts"}
        </Button>
        {status === "error" && (
          <p className={`text-xs mt-2 ${isLight ? "text-crimson" : "text-white/60"}`}>Something went wrong — please try again.</p>
        )}
      </div>
    </form>
  );
}
