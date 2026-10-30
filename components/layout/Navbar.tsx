"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navItems } from "@/config/navigation";
import { Menu, X, Terminal as TerminalIcon, Download, ArrowUpRight } from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/Icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? "bg-[#111318]/90 backdrop-blur-md border-[#30343D] shadow-terminal"
          : "bg-[#111318]/60 backdrop-blur-sm border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-md bg-[#1A1D24] border border-[#30343D] flex items-center justify-center font-mono font-bold text-accent group-hover:border-accent transition-colors">
              <span className="text-accent">&gt;</span>
              <span className="text-white text-xs font-black">!</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold tracking-tight text-white group-hover:text-accent transition-colors">
                {siteConfig.name}
              </span>
              <span className="text-[10px] font-mono text-dark-muted uppercase tracking-wider">
                Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-xs font-mono text-dark-muted hover:text-white hover:bg-[#1A1D24] rounded-md transition-all border border-transparent hover:border-[#30343D]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-dark-text bg-[#1A1D24] hover:bg-[#242832] border border-[#30343D] hover:border-dark-muted rounded-md transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-dark-muted" />
            </a>

            <Link
              href="/download/dbnerd"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#111318] bg-accent hover:bg-accent-hover rounded-md transition-all shadow-sm hover:shadow-highlight"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DBNerd v0.1</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/download/dbnerd"
              className="p-2 text-xs font-mono font-semibold text-[#111318] bg-accent rounded-md"
              title="Download DBNerd"
            >
              <Download className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-[#1A1D24] border border-[#30343D] text-dark-muted hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#30343D] bg-[#111318] px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-mono text-dark-text hover:text-accent hover:bg-[#1A1D24] rounded-md transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#30343D] flex flex-col gap-2">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-mono text-white bg-[#1A1D24] border border-[#30343D] rounded-md"
            >
              <Github className="w-4 h-4" />
              <span>Visit nerd-riot on GitHub</span>
            </a>
            <Link
              href="/download/dbnerd"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-mono font-bold text-[#111318] bg-accent rounded-md"
            >
              <Download className="w-4 h-4" />
              <span>Download DBNerd for macOS</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
