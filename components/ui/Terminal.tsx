"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal as TerminalIcon } from "lucide-react";

export function Terminal() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"quickstart" | "dbnerd">("quickstart");

  const quickstartCommands = `$ git clone https://github.com/nerd-riot/nerd-riot.git
$ cd nerd-riot
$ go test -v -race ./...
=== RUN   TestEngineThroughput
--- PASS: TestEngineThroughput (0.018s)
=== RUN   TestLSMCompactionZeroAlloc
--- PASS: TestLSMCompactionZeroAlloc (0.024s)
PASS
ok      github.com/nerd-riot/core  0.042s (142 passed)`;

  const dbnerdCommands = `$ git clone https://github.com/nerd-riot/db-nerd.git
$ cd db-nerd && pnpm install
$ cargo test --manifest-path src-tauri/Cargo.toml --lib
    Finished ` + "`test`" + ` profile [optimized + debuginfo]
     Running unittests src-tauri/src/lib.rs
test connection::test_postgres_handshake ... ok
test grid::test_120fps_canvas_buffer ... ok
test safe_mode::test_drop_table_guard ... ok
test result: ok. 38 passed; 0 failed; 0 ignored`;

  const currentSnippet = activeTab === "quickstart" ? quickstartCommands : dbnerdCommands;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl bg-[#111318] border border-[#30343D] shadow-terminal overflow-hidden transition-all">
      {/* Window Title Bar */}
      <div className="px-4 py-2.5 bg-[#1A1D24] border-b border-[#30343D] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/40" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/40" />
          <span className="ml-2 font-mono text-[11px] text-dark-muted font-medium">
            zsh — 80×24
          </span>
        </div>

        {/* Tab Switches */}
        <div className="flex items-center gap-1 bg-[#111318] p-0.5 rounded-md border border-[#30343D]">
          <button
            onClick={() => setActiveTab("quickstart")}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              activeTab === "quickstart"
                ? "bg-[#242832] text-accent font-bold"
                : "text-dark-muted hover:text-white"
            }`}
          >
            quickstart.sh
          </button>
          <button
            onClick={() => setActiveTab("dbnerd")}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              activeTab === "dbnerd"
                ? "bg-[#242832] text-accent font-bold"
                : "text-dark-muted hover:text-white"
            }`}
          >
            cargo-test.sh
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-dark-muted hover:text-white bg-[#111318] hover:bg-[#242832] border border-[#30343D] rounded transition-all"
          title="Copy snippet"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-accent" />
              <span className="text-accent">copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>copy</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-[#F4F4F5] bg-[#111318] overflow-x-auto select-text">
        {activeTab === "quickstart" ? (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-dark-muted">
              <span className="text-accent font-bold">nerd-riot</span>
              <span>on</span>
              <span className="text-blue-400">git:main</span>
              <span>➜</span>
              <span className="text-white">$ git clone https://github.com/nerd-riot/nerd-riot.git</span>
            </div>
            <div className="flex items-center gap-2 text-dark-muted">
              <span className="text-accent font-bold">nerd-riot</span>
              <span>➜</span>
              <span className="text-white">$ cd nerd-riot &amp;&amp; go test -v -race ./...</span>
            </div>
            <div className="pt-2 text-zinc-400">
              <span className="text-emerald-400 font-bold">=== RUN</span> TestEngineThroughput
            </div>
            <div className="text-emerald-400">
              --- PASS: TestEngineThroughput (0.018s)
            </div>
            <div className="text-zinc-400">
              <span className="text-emerald-400 font-bold">=== RUN</span> TestLSMCompactionZeroAlloc
            </div>
            <div className="text-emerald-400">
              --- PASS: TestLSMCompactionZeroAlloc (0.024s)
            </div>
            <div className="pt-1 flex items-center justify-between text-zinc-300 border-t border-[#30343D]/60 mt-2 pt-2">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                  PASS
                </span>
                <span className="text-xs text-zinc-400">
                  github.com/nerd-riot/core · 0.042s (142 passed)
                </span>
              </div>
              <span className="text-accent cursor-blink">▋</span>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-dark-muted">
              <span className="text-accent font-bold">dbnerd</span>
              <span>➜</span>
              <span className="text-white">cargo test --manifest-path src-tauri/Cargo.toml --lib</span>
            </div>
            <div className="text-zinc-500 pt-1">
              Finished <code className="text-zinc-300">test</code> profile [optimized + debuginfo]
            </div>
            <div className="text-zinc-400">
              Running unittests src-tauri/src/lib.rs
            </div>
            <div className="text-zinc-300 flex items-center gap-2">
              <span>test connection::test_postgres_handshake ...</span>
              <span className="text-emerald-400 font-bold">ok</span>
            </div>
            <div className="text-zinc-300 flex items-center gap-2">
              <span>test grid::test_120fps_canvas_buffer ...</span>
              <span className="text-emerald-400 font-bold">ok</span>
            </div>
            <div className="text-zinc-300 flex items-center gap-2">
              <span>test safe_mode::test_drop_table_guard ...</span>
              <span className="text-emerald-400 font-bold">ok</span>
            </div>
            <div className="pt-1 flex items-center justify-between text-zinc-300 border-t border-[#30343D]/60 mt-2 pt-2">
              <span className="text-emerald-400 font-bold text-xs">
                test result: ok. 38 passed; 0 failed; 0 ignored
              </span>
              <span className="text-accent cursor-blink">▋</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
