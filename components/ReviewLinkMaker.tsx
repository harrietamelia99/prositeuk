"use client";

import { useEffect, useMemo, useState } from "react";

type LinkType = "client" | "candidate" | "placement" | "";

const typeOptions: { value: LinkType; label: string }[] = [
  { value: "client", label: "Client" },
  { value: "candidate", label: "Candidate" },
  { value: "placement", label: "On placement" },
  { value: "", label: "Let them choose" },
];

function buildMessage(name: string, link: string) {
  const greeting = name ? `Hi ${name}` : "Hi";
  return `${greeting}, hope you're well. We're putting together some feedback from the people we've worked with this year. Could you take two minutes to leave us a quick review?\n\n${link}\n\nThanks, really appreciate it.\nCallam`;
}

export default function ReviewLinkMaker() {
  const [origin, setOrigin] = useState("https://www.prositeuk.com");
  const [name, setName] = useState("");
  const [type, setType] = useState<LinkType>("client");
  const [message, setMessage] = useState("");
  const [edited, setEdited] = useState(false);
  const [copied, setCopied] = useState<"" | "link" | "message">("");
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const link = useMemo(() => {
    const params = new URLSearchParams();
    const cleanName = name.trim();
    if (cleanName) params.set("name", cleanName);
    if (type) params.set("type", type);
    const query = params.toString();
    return `${origin}/review${query ? `?${query}` : ""}`;
  }, [origin, name, type]);

  const finalMessage = edited ? message : buildMessage(name.trim(), link);

  async function copy(text: string, what: "link" | "message") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopied("");
    }
  }

  async function share() {
    try {
      await navigator.share({ text: finalMessage });
    } catch {
      // Share sheet closed without sending
    }
  }

  function reset() {
    setName("");
    setEdited(false);
  }

  const labelCls = "text-xs uppercase tracking-widest text-charcoal/50 font-semibold";
  const inputCls =
    "w-full rounded-md border border-charcoal/20 bg-white/80 px-4 py-3 text-base text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson/35 transition-colors";
  const actionCls =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-xs font-semibold uppercase tracking-wide transition-colors";

  return (
    <div className="grid gap-6 max-w-2xl">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="maker-name" className={labelCls}>Their first name</label>
        <input
          id="maker-name"
          type="text"
          placeholder="e.g. Dave"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          autoCapitalize="words"
          className={inputCls}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className={labelCls}>They are a</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {typeOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              aria-pressed={type === opt.value}
              onClick={() => setType(opt.value)}
              className={`rounded-md border px-3 py-3 text-sm font-semibold transition-colors ${
                type === opt.value
                  ? "border-crimson bg-crimson/5 text-charcoal ring-1 ring-crimson/30"
                  : "border-charcoal/20 bg-white text-charcoal hover:border-charcoal/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="maker-message" className={labelCls}>Message</label>
          {edited && (
            <button type="button" onClick={() => setEdited(false)} className="text-xs text-crimson underline underline-offset-2">
              Reset message
            </button>
          )}
        </div>
        <textarea
          id="maker-message"
          rows={8}
          value={finalMessage}
          onChange={(e) => {
            setEdited(true);
            setMessage(e.target.value);
          }}
          className={`${inputCls} text-sm leading-relaxed resize-y`}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(finalMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${actionCls} bg-[#25D366] text-white hover:bg-[#1fb857]`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
            <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.82.83-3.03-.2-.31a8.22 8.22 0 1 1 6.95 3.85Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
          </svg>
          Send on WhatsApp
        </a>
        {canShare ? (
          <button type="button" onClick={share} className={`${actionCls} bg-crimson text-white hover:bg-crimson/90`}>
            Share another way
          </button>
        ) : (
          <a
            href={`mailto:?subject=${encodeURIComponent("Could you leave PROSITEUK a quick review?")}&body=${encodeURIComponent(finalMessage)}`}
            className={`${actionCls} bg-crimson text-white hover:bg-crimson/90`}
          >
            Send by email
          </a>
        )}
        <button
          type="button"
          onClick={() => copy(finalMessage, "message")}
          className={`${actionCls} border border-charcoal/20 bg-white text-charcoal hover:border-charcoal/40`}
        >
          {copied === "message" ? "Message copied ✓" : "Copy message"}
        </button>
        <button
          type="button"
          onClick={() => copy(link, "link")}
          className={`${actionCls} border border-charcoal/20 bg-white text-charcoal hover:border-charcoal/40`}
        >
          {copied === "link" ? "Link copied ✓" : "Copy link only"}
        </button>
      </div>

      <div className="rounded-md bg-charcoal/5 px-4 py-3 text-xs text-charcoal/60 break-all">
        <span className="font-semibold text-charcoal/70">Their link: </span>
        {link}
      </div>

      <button type="button" onClick={reset} className="justify-self-start text-sm text-crimson underline underline-offset-2">
        Start the next one
      </button>
    </div>
  );
}
