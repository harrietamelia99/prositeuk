import { ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionWrapper({ children, className = "" }: SectionWrapperProps) {
  return (
    <section className={`max-w-7xl xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}
