import { ReactNode } from "react";
import SectionWrapper from "./SectionWrapper";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="bg-ink pt-6 sm:pt-7 pb-5 sm:pb-7 min-h-screen" data-dark>
      <SectionWrapper className="space-y-6 sm:space-y-7">{children}</SectionWrapper>
    </div>
  );
}
