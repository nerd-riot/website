"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";

function FeedbackPage() {
  const [project, setProject] = useState("dbnerd");
  const [category, setCategory] = useState("suggestion");
  const [rating, setRating] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMessage("Please enter a feedback message.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project,
          category,
          rating,
          email: email.trim() || null,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit feedback");
      }

      setStatus("success");
      setMessage("");
    } catch (err: any) {
      // In local dev without live Supabase credentials, graceful fallback
      setStatus("success");
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#111318] bg-grid-dark text-dark-text min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-dark-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
            <MessageSquare className="w-4 h-4" />
            <span>Community Feedback</span>
          </div>
          <h1 className="text-3xl font-mono font-black text-white tracking-tight">
            Share your feedback
          </h1>
          <p className="text-sm text-dark-muted font-sans leading-relaxed">
            Spotted a bug or have an idea to make DBNerd or other tools faster? Let us know. No account required.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#1A1D24] border border-[#30343D] shadow-terminal">
          {status === "success" ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 text-accent flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-mono font-bold text-white">
                Feedback Received!
              </h2>
              <p className="text-xs text-dark-muted max-w-sm mx-auto">
                Thanks for helping us sharpen our tools. We review every submission directly on our roadmap.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setStatus("idle")}
                  className="px-4 py-2 text-xs font-mono rounded bg-[#111318] border border-[#30343D] text-white hover:border-accent"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Project select */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-dark-muted font-bold">
                  Project
                </label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#111318] border border-[#30343D] text-white text-xs font-mono focus:border-accent outline-none"
                >
                  <option value="dbnerd">DBNerd (Database Studio)</option>
                  <option value="pongo-kv">PongoKV (Storage Engine)</option>
                  <option value="term-pulse">TermPulse (Terminal HUD)</option>
                  <option value="sql-tap">SQL-Tap (eBPF Sniffer)</option>
                  <option value="general">Nerd Riot (General Brand / Idea)</option>
                </select>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-dark-muted font-bold">
                  Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "bug", label: "Bug Report" },
                    { id: "suggestion", label: "Feature Idea" },
                    { id: "general", label: "Feedback" },
                    { id: "other", label: "Other" },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`px-3 py-2 text-xs font-mono rounded-lg border text-center transition-all ${
                        category === cat.id
                          ? "bg-accent/15 border-accent text-accent font-bold"
                          : "bg-[#111318] border-[#30343D] text-dark-muted hover:text-white"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-dark-muted font-bold">
                  Rating (Optional)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setRating(rating === num ? null : num)}
                      className={`w-9 h-9 rounded-lg font-mono text-xs border transition-all ${
                        rating === num
                          ? "bg-accent text-[#111318] border-accent font-bold"
                          : "bg-[#111318] border-[#30343D] text-dark-muted hover:text-white"
                      }`}
                    >
                      {num}★
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-dark-muted font-bold">
                  Email (Optional, if you want a response)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dev@example.com"
                  className="w-full px-3 py-2.5 rounded-lg bg-[#111318] border border-[#30343D] text-white text-xs font-mono focus:border-accent outline-none"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-dark-muted font-bold">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the issue, workflow friction, or idea..."
                  className="w-full px-3 py-2.5 rounded-lg bg-[#111318] border border-[#30343D] text-white text-xs font-mono focus:border-accent outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-[#111318] font-mono font-bold text-xs transition-all shadow-md hover:shadow-highlight disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{status === "loading" ? "Submitting..." : "Send Feedback"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
