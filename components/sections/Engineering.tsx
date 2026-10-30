import React from "react";
import { siteConfig } from "@/config/site";
import { Terminal, Shield, Zap, GitPullRequest, Code2 } from "lucide-react";

export function Engineering() {
  const techStack = [
    "Rust",
    "Go 1.24",
    "Tauri v2",
    "PostgreSQL",
    "Distributed Systems",
    "eBPF",
    "React 19",
    "TypeScript",
    "WGPU",
    "LSM Trees",
    "Cloud Native",
    "Developer Experience",
  ];

  return (
    <section id="philosophy" className="py-24 bg-light-bg text-light-text border-b border-light-border bg-grid-light transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-light-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
            <span>03 // Manifesto</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-light-text">
            Built with intention.
          </h2>
          <p className="text-base text-light-muted font-sans leading-relaxed max-w-xl">
            We don&apos;t chase hype cycles or build resume-padding architectures. We build lean, predictable software that solves actual friction.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
          <div className="md:col-span-8 space-y-4">
            {siteConfig.principles.map((principle, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-light-surface border border-light-border shadow-light-card hover:border-zinc-800 transition-all duration-150"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-sm font-bold text-zinc-400 shrink-0 mt-0.5">
                    // 0{idx + 1}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="font-mono font-bold text-lg text-light-text">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-light-muted leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Technical Craftsmanship Card */}
          <div className="md:col-span-4 space-y-6">
            <div className="p-6 rounded-xl bg-light-surface border border-light-border shadow-light-card space-y-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-zinc-900" />
                <h4 className="font-mono font-bold text-sm text-light-text uppercase tracking-wide">
                  Core Technical DNA
                </h4>
              </div>

              <p className="text-xs text-light-muted leading-relaxed">
                Technologies we actively study, benchmark, and deploy in production systems:
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-zinc-100 text-zinc-800 border border-light-border hover:bg-zinc-200 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote Box */}
            <div className="p-6 rounded-xl bg-zinc-900 text-white font-mono text-xs leading-relaxed space-y-3">
              <div className="text-accent text-sm font-bold">&gt; nerd_riot.credo</div>
              <p className="text-zinc-300 italic">
                &ldquo;Small tools. Sharp edges. Zero unnecessary bullshit. If a tool doesn&apos;t feel fast, it doesn&apos;t ship.&rdquo;
              </p>
              <div className="text-[10px] text-zinc-500 pt-2 border-t border-zinc-800">
                // NERD RIOT ENGINEERING STANDARDS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
