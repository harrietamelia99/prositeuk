import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  variant?: "filled" | "outlined";
  href?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 sm:px-5 py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0";

const variantStyles = {
  filled: "bg-crimson text-white hover:bg-crimson/90",
  outlined: "border border-white text-white hover:bg-white hover:text-ink"
};

export default function Button({
  variant = "filled",
  href,
  children,
  icon,
  className = "",
  type = "button",
  onClick
}: ButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={styles}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {icon}
      {children}
    </button>
  );
}
