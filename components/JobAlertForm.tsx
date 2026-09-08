"use client";

import { useState } from "react";

interface Fields {
  name: string;
  email: string;
  phone: string;
  collarPreference: string;
  location: string;
}

export default function JobAlertForm() {
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

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <p className="text-2xl mb-2">✓</p>
        <p className="text-white font-semibold text-base mb-1">You&apos;re registered!</p>
        <p className="text-white/70 text-sm">We&apos;ll be in touch when a suitable role comes up. Check your inbox for a confirmation.</p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-sm bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-widest text-white/50 font-semibold">Name *</label>
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
        <label className="text-xs uppercase tracking-widest text-white/50 font-semibold">Email *</label>
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
        <label className="text-xs uppercase tracking-widest text-white/50 font-semibold">Phone <span className="normal-case tracking-normal font-normal opacity-60">(optional)</span></label>
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
        <label className="text-xs uppercase tracking-widest text-white/50 font-semibold">Preferred location <span className="normal-case tracking-normal font-normal opacity-60">(optional)</span></label>
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
        <label className="text-xs uppercase tracking-widest text-white/50 font-semibold">Role preference *</label>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { value: "blue", label: "🔵 Blue Collar", sub: "Groundworkers, labourers & plant operators" },
            { value: "white", label: "⚪️ White Collar", sub: "Site engineers & project management" },
            { value: "both", label: "Both", sub: "Open to all roles" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update("collarPreference", opt.value)}
              className={`rounded-sm border px-4 py-3 text-left transition-colors ${
                fields.collarPreference === opt.value
                  ? "border-white bg-white/20 text-white"
                  : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/35"
              }`}
            >
              <p className="text-sm font-semibold">{opt.label}</p>
              <p className="text-xs text-white/50 mt-0.5">{opt.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Submit — full width */}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "loading" || !fields.collarPreference}
          className="w-full sm:w-auto rounded-sm bg-white text-ink px-8 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-offwhite transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Registering…" : "Register for job alerts"}
        </button>
        {status === "error" && (
          <p className="text-white/60 text-xs mt-2">Something went wrong — please try again.</p>
        )}
      </div>
    </form>
  );
}
