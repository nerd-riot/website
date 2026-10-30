import React from "react";
import { siteConfig } from "@/config/site";
import { GitPullRequest, MessageSquare, Terminal, ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/Icons";

export function OpenSource() {
  return (
    <section id="opensource" className="py-24 bg-[#111318] text-dark-text border-b border-[#30343D] bg-grid-dark transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>04 // Community</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-white">
            Built in the open.
          </h2>

          <p className="text-base sm:text-lg text-dark-muted font-sans max-w-2xl mx-auto leading-relaxed">
            Good software gets better when more people build together. Our tools, benchmarks, and architecture decisions are public from commit one.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
          {/* Card 1: Open Repositories */}
          <div className="p-6 rounded-xl bg-[#1A1D24] border border-[#30343D] space-y-4 shadow-card">
            <div className="w-9 h-9 rounded-lg bg-[#111318] border border-[#30343D] flex items-center justify-center text-accent">
              <Github className="w-5 h-5" />
            </div>
            <h3 className="font-mono font-bold text-lg text-white">
              Public Repositories
            </h3>
            <p className="text-xs text-dark-muted leading-relaxed">
              Transparent issue trackers, automated test suites, and public changelogs. No gatekeeping.
            </p>
            <div className="pt-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline"
              >
                <span>Browse github.com/nerd-riot</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Contribute & Fork */}
          <div className="p-6 rounded-xl bg-[#1A1D24] border border-[#30343D] space-y-4 shadow-card">
            <div className="w-9 h-9 rounded-lg bg-[#111318] border border-[#30343D] flex items-center justify-center text-accent">
              <GitPullRequest className="w-5 h-5" />
            </div>
            <h3 className="font-mono font-bold text-lg text-white">
              Contribute &amp; Fork
            </h3>
            <p className="text-xs text-dark-muted leading-relaxed">
              We welcome bug reports, performance PRs, documentation polish, and architectural critique.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/nerd-riot/.github/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline"
              >
                <span>Read Contributing Guidelines</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Permissive Licensing */}
          <div className="p-6 rounded-xl bg-[#1A1D24] border border-[#30343D] space-y-4 shadow-card">
            <div className="w-9 h-9 rounded-lg bg-[#111318] border border-[#30343D] flex items-center justify-center text-accent">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-mono font-bold text-lg text-white">
              Permissive Licensing
            </h3>
            <p className="text-xs text-dark-muted leading-relaxed">
              Licensed under MIT or Apache 2.0. Free for indie hackers, commercial startups, and enterprise teams.
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-[#111318] border border-[#30343D] text-zinc-400">
                MIT License &bull; Free Forever
              </span>
            </div>
          </div>
        </div>

        {/* Big Interactive Community Banner */}
        <div className="max-w-4xl mx-auto rounded-xl bg-[#1A1D24] border border-[#30343D] p-8 sm:p-10 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
              Join the Collective
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white max-w-xl mx-auto">
            Have an idea for a developer tool? Let&apos;s build it.
          </h3>

          <p className="text-sm text-dark-muted max-w-md mx-auto">
            Star our repositories, join the discussions, or submit your first pull request today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent hover:bg-accent-hover text-[#111318] font-mono font-bold text-sm transition-all shadow-md hover:shadow-highlight"
            >
              <Github className="w-4 h-4" />
              <span>Join the Riot on GitHub</span>
            </a>

            <a
              href={siteConfig.links.email}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#111318] hover:bg-[#242832] text-white font-mono text-sm border border-[#30343D] hover:border-dark-muted transition-all"
            >
              <span>Get in touch via Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
