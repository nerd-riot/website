import React from "react";
import { siteConfig } from "@/config/site";
import { Wrench, Server, Share2, FlaskConical, ArrowRight } from "lucide-react";

export function WhatWeBuild() {
  const iconMap: Record<string, React.ReactNode> = {
    "developer-tools": <Wrench className="w-5 h-5 text-zinc-900" />,
    "backend-systems": <Server className="w-5 h-5 text-zinc-900" />,
    "open-source": <Share2 className="w-5 h-5 text-zinc-900" />,
    experiments: <FlaskConical className="w-5 h-5 text-zinc-900" />,
  };

  return (
    <section id="capabilities" className="py-24 bg-light-bg text-light-text border-b border-light-border bg-grid-light transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-light-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
            <span>01 // Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-light-text">
            Ideas into software.
          </h2>
          <p className="text-base text-light-muted leading-relaxed font-sans max-w-xl">
            We focus on four foundational engineering domains, turning complex systems problems into ergonomic, high-performance software.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteConfig.capabilities.map((cap) => (
            <div
              key={cap.id}
              className="group p-8 rounded-xl bg-light-surface border border-light-border hover:border-zinc-800 shadow-light-card transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-zinc-100 border border-light-border group-hover:bg-[#111318] group-hover:text-accent transition-colors">
                    {iconMap[cap.id]}
                  </div>
                  <span className="font-mono text-sm font-bold text-zinc-400 group-hover:text-zinc-900 transition-colors">
                    {cap.number}
                  </span>
                </div>

                <h3 className="text-xl font-mono font-bold text-light-text group-hover:text-black transition-colors">
                  {cap.title}
                </h3>

                <p className="text-sm text-light-muted leading-relaxed">
                  {cap.description}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-6 mt-6 border-t border-light-border/70 flex flex-wrap items-center gap-2">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded bg-zinc-100 text-zinc-700 border border-light-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
