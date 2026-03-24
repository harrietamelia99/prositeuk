"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -300, y: -300 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY };

      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const el = glowRef.current;
        if (!el) return;

        // Check if cursor is over a dark section
        const target = document.elementFromPoint(pos.current.x, pos.current.y);
        const isDark =
          target?.closest("[data-dark]") !== null ||
          target?.closest(".bg-ink") !== null ||
          target?.closest(".bg-charcoal") !== null;

        el.style.left = `${pos.current.x}px`;
        el.style.top = `${pos.current.y}px`;
        el.style.opacity = isDark ? "1" : "0";
      });
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
      style={{
        left: -300,
        top: -300,
        opacity: 0,
        width: 340,
        height: 340,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(112,14,13,0.18) 0%, rgba(112,14,13,0.06) 50%, transparent 75%)",
      }}
    />
  );
}
