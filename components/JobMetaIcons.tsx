type JobMetaIconsProps = {
  location: string;
  salary: string;
  employmentType: string;
  contractLabel?: string;
  className?: string;
};

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="h-10 w-10 rounded-full bg-gradient-to-br from-crimson to-ink text-white inline-flex items-center justify-center shrink-0">
      {children}
    </span>
  );
}

function MetaItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 min-w-[220px]">
      <IconBadge>{icon}</IconBadge>
      <span className="text-charcoal text-base font-medium">{text}</span>
    </div>
  );
}

export default function JobMetaIcons({
  location,
  salary,
  employmentType,
  contractLabel = "Long term contract",
  className = ""
}: JobMetaIconsProps) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>
      <MetaItem
        text={location}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        }
      />
      <MetaItem
        text={salary}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 4h6l-1.2 2H10.2L9 4z" />
            <path d="M12 9c-3.5 0-6 2.6-6 6 0 3.3 2.6 5 6 5s6-1.7 6-5c0-3.4-2.5-6-6-6z" />
            <path d="M13.8 13.2a1.9 1.9 0 00-1.6-.6h-.8a1.4 1.4 0 000 2.8h1a1.4 1.4 0 010 2.8h-.7a2.1 2.1 0 01-1.6-.6" />
            <path d="M11.7 12v6" />
          </svg>
        }
      />
      <MetaItem
        text={employmentType}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        }
      />
      <MetaItem
        text={contractLabel}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 10h18" />
          </svg>
        }
      />
    </div>
  );
}
