"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL = "/countries-50m.json";

const JOB_PINS = [
  {
    id: "london",
    label: "London & South East",
    coordinates: [-0.12, 51.5] as [number, number],
    jobs: [
      { title: "Site Engineer", slug: "site-engineer-london" },
      { title: "Site Engineer – Transport for London", slug: "site-engineer-tfl-london" },
      { title: "Senior Site Engineer – Civils", slug: "senior-site-engineer-civils-permanent" },
      { title: "Groundworker", slug: "groundworker-london" },
    ],
  },
  {
    id: "suffolk",
    label: "Sizewell C, Suffolk",
    coordinates: [1.62, 52.2] as [number, number],
    jobs: [
      { title: "Senior Site Engineer (x2) – Sizewell C", slug: "senior-site-engineer-sizewell-c" },
    ],
  },
  {
    id: "midlands",
    label: "Midlands",
    coordinates: [-1.89, 52.48] as [number, number],
    jobs: [
      { title: "Setting Out Engineer – National Highways", slug: "setting-out-engineer-national-highways" },
    ],
  },
];

export default function JobMap() {
  const [activePin, setActivePin] = useState<string | null>(null);
  const active = JOB_PINS.find((p) => p.id === activePin);

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-ink glass-outline-subtle" data-dark>
      <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex flex-row items-stretch">

        {/* Map column — portrait strip */}
        <div className="relative shrink-0 w-[160px] sm:w-[210px] md:w-[240px] lg:w-[280px] overflow-hidden">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [-3, 54.5], scale: 1550 }}
            width={260}
            height={480}
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            {/* All countries for geographic context */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isUK = geo.id === "826";
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: isUK ? "#303030" : "#181818",
                          stroke: isUK ? "#505050" : "#222",
                          strokeWidth: isUK ? 0.6 : 0.3,
                          outline: "none",
                        },
                        hover: {
                          fill: isUK ? "#303030" : "#181818",
                          outline: "none",
                        },
                        pressed: {
                          fill: isUK ? "#303030" : "#181818",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {JOB_PINS.map((pin) => (
              <Marker
                key={pin.id}
                coordinates={pin.coordinates}
                onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
              >
                <circle
                  r={activePin === pin.id ? 13 : 9}
                  fill={
                    activePin === pin.id
                      ? "rgba(112,14,13,0.3)"
                      : "rgba(112,14,13,0.15)"
                  }
                  style={{ transition: "r 0.2s ease, fill 0.2s ease" }}
                />
                <circle
                  r={activePin === pin.id ? 5.5 : 4.5}
                  fill="#700E0D"
                  stroke="#fff"
                  strokeWidth={1.5}
                  style={{ cursor: "pointer", transition: "r 0.2s ease" }}
                />
                {pin.jobs.length > 1 && (
                  <text
                    y={-12}
                    textAnchor="middle"
                    fontSize={7}
                    fill="white"
                    fontFamily="sans-serif"
                    fontWeight="700"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {pin.jobs.length}
                  </text>
                )}
              </Marker>
            ))}
          </ComposableMap>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-ink/90 border border-white/10 rounded-md px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            <span className="text-[9px] text-white/50 uppercase tracking-widest">Live roles</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex-1 border-l border-white/10 p-4 sm:p-5 flex flex-col gap-2.5">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="text-white font-semibold text-xs sm:text-sm">Current opportunities</h3>
              <p className="text-white/40 text-[10px] sm:text-xs mt-0.5">Click a pin to filter</p>
            </div>
            <Link href="/jobs" className="text-[10px] text-white/50 hover:text-white transition-colors shrink-0 mt-0.5">
              View all →
            </Link>
          </div>

          <div className="space-y-2">
            {(
              active
                ? active.jobs.map((j) => ({ ...j, pinLabel: active.label }))
                : JOB_PINS.flatMap((p) => p.jobs.map((j) => ({ ...j, pinLabel: p.label })))
            ).map((job) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                className="group flex items-start justify-between gap-2 rounded-lg border border-white/10 bg-white/5 hover:bg-crimson/20 hover:border-crimson/40 px-3.5 py-2.5 transition-all duration-200"
              >
                <div>
                  <p className="text-white text-xs font-medium leading-snug">{job.title}</p>
                  <p className="text-white/40 text-[10px] mt-0.5 flex items-center gap-1">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {job.pinLabel}
                  </p>
                </div>
                <svg
                  aria-hidden
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white/30 group-hover:text-white/70 mt-0.5 shrink-0 transition-colors"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </div>

          {active && (
            <button
              onClick={() => setActivePin(null)}
              className="text-[10px] text-crimson/80 hover:text-crimson underline underline-offset-2 text-left"
            >
              Clear filter
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
