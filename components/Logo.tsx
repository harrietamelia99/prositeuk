import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  light?: boolean;
  withLink?: boolean;
  className?: string;
  size?: "navbar" | "footer";
};

function LogoMark({ light = false, size = "navbar" }: { light?: boolean; size?: "navbar" | "footer" }) {
  const iconClass =
    size === "navbar" ? "h-6 sm:h-7 md:h-[1.9rem] w-auto" : "h-4 sm:h-5 md:h-[1.4rem] w-auto";
  const iconToneClass = light ? "brightness-0 invert" : "";

  return (
    <Image
      src="/pro-icon.svg"
      alt="PROSITEUK icon"
      width={46}
      height={26}
      className={`${iconClass} ${iconToneClass}`.trim()}
      aria-hidden="true"
      priority
    />
  );
}

function LogoContent({ light = false, size = "navbar" }: { light?: boolean; size?: "navbar" | "footer" }) {
  const wordmarkClass =
    size === "navbar" ? "text-[1.55rem] sm:text-[1.75rem] md:text-[2rem]" : "text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem]";
  const gapClass = size === "navbar" ? "gap-2" : "gap-1.5";

  return (
    <span className={`inline-flex items-center ${gapClass}`}>
      <LogoMark light={light} size={size} />
      <span className={`logo-wordmark ${wordmarkClass} leading-none translate-y-[1.5px] ${light ? "text-white" : "text-charcoal"}`}>
        PROSITEUK
      </span>
    </span>
  );
}

export default function Logo({ light = false, withLink = true, className = "", size = "navbar" }: LogoProps) {
  if (!withLink) {
    return (
      <div className={className}>
        <LogoContent light={light} size={size} />
      </div>
    );
  }

  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="PROSITEUK home">
      <LogoContent light={light} size={size} />
    </Link>
  );
}
