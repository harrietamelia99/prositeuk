"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Job } from "@/lib/crm-types";

const GEO_URL = "/countries-50m.json";

const REGION_MAP: Record<string, { label: string; coordinates: [number, number] }> = {
  "london-south-east": { label: "London & South East", coordinates: [-0.12, 51.5] },
  "suffolk-east-anglia": { label: "Suffolk / East Anglia", coordinates: [1.62, 52.2] },
  "midlands": { label: "Midlands", coordinates: [-1.89, 52.48] },
  "north-west": { label: "North West", coordinates: [-2.24, 53.48] },
  "yorkshire": { label: "Yorkshire", coordinates: [-1.55, 53.8] },
  "south-west": { label: "South West", coordinates: [-2.59, 51.45] },
  "wales": { label: "Wales", coordinates: [-3.18, 51.48] },
  "scotland": { label: "Scotland", coordinates: [-3.19, 55.95] },
  "north-east": { label: "North East", coordinates: [-1.62, 54.98] },
  "remote": { label: "Remote / UK-Wide", coordinates: [-1.5, 52.5] },
};

type Pin = {
  id: string;
  label: string;
  coordinates: [number, number];
  jobs: { title: string; slug: string }[];
};

function buildPins(jobs: Job[]): Pin[] {
  const grouped: Record<string, Pin> = {};
  for (const job of jobs) {
    let coords: [number, number] | undefined;
    let label: string;
    let key: string;

    if (job.coordinates) {
      // Group by rounded coordinates (~10km precision) to cluster nearby jobs
      const rLng = Math.round(job.coordinates[0] * 10) / 10;
      const rLat = Math.round(job.coordinates[1] * 10) / 10;
      key = `${rLng},${rLat}`;
      coords = job.coordinates;
      label = job.location;
    } else if (job.region && REGION_MAP[job.region]) {
      key = job.region;
      coords = REGION_MAP[job.region].coordinates;
      label = REGION_MAP[job.region].label;
    } else {
      continue;
    }

    if (!grouped[key]) {
      grouped[key] = { id: key, label, coordinates: coords, jobs: [] };
    }
    grouped[key].jobs.push({ title: job.title, slug: job.slug });
  }
  return Object.values(grouped);
}

export default function JobMap({ jobs }: { jobs: Job[] }) {
  const pins = buildPins(jobs);
  const [activePin, setActivePin] = useState<string | null>(null);
  const active = pins.find((p) => p.id === activePin);

  const visibleJobs = active
    ? active.jobs.map((j) => ({ ...j, pinLabel: active.label }))
    : pins.flatMap((p) => p.jobs.map((j) => ({ ...j, pinLabel: p.label })));

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-ink glass-outline-subtle" data-dark>
      <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex flex-row items-stretch">
        {/* Map column */}
        <div className="relative shrink-0 w-[160px] sm:w-[210px] md:w-[240px] lg:w-[280px] overflow-hidden">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [-3, 54.5], scale: 1550 }}
            width={260}
            height={480}
            style={{ width: "100%", height: "auto", display: "block" }}
          >
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
                        hover: { fill: isUK ? "#303030" : "#181818", outline: "none" },
                        pressed: { fill: isUK ? "#303030" : "#181818", outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {pins.map((pin) => (
              <Marker
                key={pin.id}
                coordinates={pin.coordinates}
                onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
              >
                <circle
                  r={activePin === pin.id ? 13 : 9}
                  fill={activePin === pin.id ? "rgba(112,14,13,0.3)" : "rgba(112,14,13,0.15)"}
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
            {visibleJobs.length === 0 && (
              <p className="text-white/40 text-xs">No live roles right now — check back soon.</p>
            )}
            {visibleJobs.map((job) => (
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
