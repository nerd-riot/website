import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Mail, ArrowUpRight, Terminal, Heart, Sparkles } from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="bg-light-bg text-light-text border-t border-light-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Main Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#111318] text-accent flex items-center justify-center font-mono font-bold text-sm">
                &gt;!
              </div>
              <span className="font-mono font-bold text-lg tracking-tight text-light-text">
                {siteConfig.name}
              </span>
            </div>

            <p className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-light-text">
              &ldquo;Stay curious. Keep building.&rdquo;
            </p>

            <p className="text-sm text-light-muted max-w-sm leading-relaxed">
              An engineering collective building sharp developer tools, reliable backend engines, and open-source infrastructure.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium text-light-text bg-light-surface border border-light-border hover:border-light-text rounded-md transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/nerd-riot</span>
                <ArrowUpRight className="w-3 h-3 text-light-muted" />
              </a>

              <a
                href={siteConfig.links.email}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium text-light-text bg-light-surface border border-light-border hover:border-light-text rounded-md transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-light-muted">
              Projects
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/download/dbnerd"
                  className="font-mono text-light-text hover:text-black hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>DBNerd Studio</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#111318] text-accent rounded font-mono font-bold">
                    v0.1
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="#projects"
                  className="font-mono text-light-muted hover:text-light-text transition-colors"
                >
                  PongoKV
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="font-mono text-light-muted hover:text-light-text transition-colors"
                >
                  TermPulse
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="font-mono text-light-muted hover:text-light-text transition-colors"
                >
                  SQL-Tap
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-light-muted">
              Resources
            </h4>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <Link
                  href="/releases"
                  className="text-light-muted hover:text-light-text transition-colors"
                >
                  Releases &amp; Notes
                </Link>
              </li>
              <li>
                <a
                  href="#capabilities"
                  className="text-light-muted hover:text-light-text transition-colors"
                >
                  Capabilities
                </a>
              </li>
              <li>
                <a
                  href="#philosophy"
                  className="text-light-muted hover:text-light-text transition-colors"
                >
                  Engineering Manifesto
                </a>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="text-light-muted hover:text-light-text transition-colors"
                >
                  Submit Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Collective Status */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-light-muted">
              Status &amp; Stack
            </h4>
            <div className="p-3 bg-light-surface border border-light-border rounded-md font-mono text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-light-text font-semibold">Systems Operating</span>
              </div>
              <p className="text-[11px] text-light-muted leading-relaxed">
                Core engine: Rust + Tauri v2<br />
                Web: Next.js + Tailwind + Bun<br />
                Hosting: Vercel + Cloudflare R2
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-light-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-light-muted">
          <div>
            &copy; {new Date().getFullYear()} NERD RIOT. Made by engineers who give a damn.
          </div>
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-light-text transition-colors"
            >
              GitHub Org
            </a>
            <span className="text-light-border">•</span>
            <span className="text-[11px]">MIT &amp; Apache 2.0 Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
