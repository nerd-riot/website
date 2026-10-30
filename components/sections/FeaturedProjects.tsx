"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projectsConfig, ProjectItem } from "@/config/projects";
import { Download, ArrowUpRight, CheckCircle2, Cpu, Eye, ExternalLink } from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/Icons";

export function FeaturedProjects() {
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const flagship = projectsConfig.find((p) => p.isFlagship) || projectsConfig[0];
  const otherProjects = projectsConfig.filter((p) => !p.isFlagship);

  return (
    <section id="projects" className="py-24 bg-[#111318] text-dark-text border-b border-[#30343D] bg-grid-dark transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>02 // Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-white">
              Stuff we&apos;ve built.
            </h2>
            <p className="text-base text-dark-muted font-sans leading-relaxed">
              Software crafted with uncompromising standards for latency, memory footprint, and daily developer ergonomics.
            </p>
          </div>

          <a
            href="https://github.com/nerd-riot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium text-dark-text bg-[#1A1D24] hover:bg-[#242832] border border-[#30343D] hover:border-dark-muted rounded-md transition-all self-start md:self-auto"
          >
            <Github className="w-4 h-4" />
            <span>View all repositories on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-dark-muted" />
          </a>
        </div>

        {/* Flagship Product Showcase (DBNerd) */}
        {flagship && (
          <div className="mb-14 rounded-xl border border-[#30343D] bg-[#1A1D24] overflow-hidden shadow-terminal transition-all">
            <div className="p-6 sm:p-8 border-b border-[#30343D] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-accent/15 border border-accent/40 text-accent font-mono text-xs font-bold uppercase">
                    {flagship.status}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#111318] border border-[#30343D] text-dark-muted font-mono text-xs">
                    {flagship.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src="/media/app-icon.png"
                    alt="DBNerd Logo"
                    className="w-10 h-10 rounded-xl shadow-md"
                  />
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                      {flagship.name}
                    </h3>
                    <p className="font-mono text-xs text-accent">
                      {flagship.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-dark-muted leading-relaxed">
                  {flagship.description}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {flagship.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <Link
                  href="/download/dbnerd"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-accent hover:bg-accent-hover text-[#111318] font-mono font-bold text-sm transition-all shadow-md hover:shadow-highlight"
                >
                  <Download className="w-4 h-4" />
                  <span>Download DMG (macOS)</span>
                </Link>

                <a
                  href={flagship.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#111318] hover:bg-[#242832] text-white font-mono text-sm border border-[#30343D] hover:border-dark-muted transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* Interactive Gallery Tabs */}
            {flagship.gallery && flagship.gallery.length > 0 && (
              <div className="p-4 sm:p-6 bg-[#111318]/60">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {flagship.gallery.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedGalleryIdx(idx)}
                      className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                        selectedGalleryIdx === idx
                          ? "bg-accent text-[#111318] font-bold"
                          : "bg-[#1A1D24] text-dark-muted hover:text-white border border-[#30343D]"
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>

                <div className="relative rounded-lg overflow-hidden border border-[#30343D] bg-[#0E1015]">
                  <img
                    src={flagship.gallery[selectedGalleryIdx].src}
                    alt={flagship.gallery[selectedGalleryIdx].title}
                    className="w-full h-auto object-cover max-h-[500px]"
                  />
                  <div className="p-3 bg-[#1A1D24]/90 border-t border-[#30343D] flex items-center justify-between font-mono text-xs">
                    <span className="text-white font-medium">
                      {flagship.gallery[selectedGalleryIdx].description}
                    </span>
                    <span className="text-dark-muted hidden sm:inline">
                      {selectedGalleryIdx + 1} / {flagship.gallery.length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-xl bg-[#1A1D24] border border-[#30343D] hover:border-dark-muted shadow-card transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#111318] border border-[#30343D] text-dark-muted">
                    {project.category}
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {project.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-mono font-bold text-white group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <p className="font-mono text-xs text-accent mt-0.5">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-xs text-dark-muted leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5 pt-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="text-[11px] font-mono text-zinc-400 flex items-start gap-1.5">
                      <span className="text-accent">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack & Link */}
              <div className="pt-6 mt-6 border-t border-[#30343D] space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111318] text-zinc-300 border border-[#30343D]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-dark-muted hover:text-accent transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect source</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
