"use client";

import { useState } from "react";

const testimonials = [
  "PROSITEUK supplied an engineer to our project at DP world, to lay scour protection mattresses on the sea bed. They exceeded our expectations and our go to supplier for site engineers.",
  "A highly professional team that genuinely understands the engineering market. They consistently connect us with quality candidates that fit our culture.",
  "From urgent temporary placements to specialist permanent hires, PROSITEUK delivers every time with clear communication and reliable support."
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((current) => (current + 1) % testimonials.length);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-xl bg-gradient-to-br from-[#efefef] via-white to-white p-8 sm:p-10 shadow-sm border border-charcoal/15 glass-outline-subtle min-h-[170px] flex items-center justify-center">
        <p key={index} className="text-center text-charcoal leading-relaxed animate-[fade_300ms_ease-in-out]">
          {testimonials[index]}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="h-10 w-10 rounded-full bg-crimson text-white hover:bg-crimson/90 transition-colors"
        >
          ←
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="h-10 w-10 rounded-full bg-crimson text-white hover:bg-crimson/90 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
}
