export const siteConfig = {
  name: "NERD RIOT",
  shortName: "Nerd Riot",
  tagline: "We build things. We break limits.",
  description:
    "A collective of engineers building useful software, developer tools, backend systems, and open-source projects.",
  brandPositioning: "Build useful things. Share what we learn. Keep engineering fun.",
  url: "https://nerd-riot.dev",
  ogImage: "/images/nerd-riot-hero.jpg",
  links: {
    github: "https://github.com/nerd-riot",
    githubRepo: "https://github.com/nerd-riot/website",
    twitter: "https://x.com/nerd_riot",
    discord: "https://discord.gg/nerdriot",
    email: "mailto:hello@nerd-riot.dev",
  },
  principles: [
    {
      title: "Simplicity over unnecessary complexity",
      description: "No enterprise fluff, no microservices resume-padding. The best code is code that's easy to delete.",
    },
    {
      title: "Performance matters",
      description: "Latency is user experience. We obsess over milliseconds, memory footprints, and frame drops.",
    },
    {
      title: "Maintainability is a feature",
      description: "Code is read 10x more than written. Clear interfaces and strict types trump clever one-liners.",
    },
    {
      title: "Build for real-world problems",
      description: "We build tools we actually use daily in our engineering workflows, not synthetic demo-ware.",
    },
    {
      title: "Share knowledge and build in the open",
      description: "Good software gets better when more people build together. Open standards, open docs.",
    },
  ],
  capabilities: [
    {
      id: "developer-tools",
      number: "01",
      title: "Developer Tools",
      description: "Desktop studios, CLI utilities, and workflows that eliminate friction and keep developers in flow state.",
      tags: ["Tauri v2", "Rust", "TypeScript", "Keyboard-first"],
    },
    {
      id: "backend-systems",
      number: "02",
      title: "Backend Systems",
      description: "Reliable, high-throughput engines, data stores, and event pipelines with zero tolerance for memory leaks.",
      tags: ["Go", "Rust", "PostgreSQL", "Distributed Systems"],
    },
    {
      id: "open-source",
      number: "03",
      title: "Open Source",
      description: "Sharing battle-tested libraries, client SDKs, and contributing upstream to modern developer foundations.",
      tags: ["MIT / Apache-2.0", "GitHub Actions", "Community-led"],
    },
    {
      id: "experiments",
      number: "04",
      title: "Experiments",
      description: "Unconventional prototypes, eBPF sniffers, terminal graphics, and bleeding-edge system explorations.",
      tags: ["eBPF", "WGPU", "Memory Mapped I/O", "WASM"],
    },
  ],
};
