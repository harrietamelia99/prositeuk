"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LaunchScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasSeenLaunch = sessionStorage.getItem("prositeuk-launch-seen");
    if (hasSeenLaunch) return;

    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("prositeuk-launch-seen", "1");
    }, 1600);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-ink flex items-center justify-center px-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-4">
          <Image
            src="/pro-icon-white.svg"
            alt="PROSITEUK icon"
            width={58}
            height={32}
            className="h-8 sm:h-10 w-auto loader-icon-float"
            priority
          />
          <span className="logo-wordmark text-[2rem] sm:text-[2.6rem] text-white leading-none loader-wordmark-fade">
            PROSITEUK
          </span>
        </div>

        <div className="mt-6 h-1.5 w-44 sm:w-56 mx-auto rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-crimson to-transparent loader-progress" />
        </div>
      </div>
    </div>
  );
}
