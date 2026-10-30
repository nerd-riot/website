export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: "Developer Tools" | "Backend Systems" | "Open Source" | "Experiments";
  stack: string[];
  githubUrl: string;
  demoUrl?: string;
  downloadUrl?: string;
  status: "Flagship / v0.1.0" | "Alpha" | "Experiment" | "Research" | "In Development";
  isFlagship?: boolean;
  highlights: string[];
  primaryImage: string;
  gallery?: {
    title: string;
    description: string;
    src: string;
  }[];
}

export const projectsConfig: ProjectItem[] = [
  {
    id: "dbnerd",
    slug: "dbnerd",
    name: "DBNerd",
    tagline: "The ultra-fast, native-feel database studio",
    description:
      "A lightweight desktop database client built with Tauri v2 + Rust Core and React 19. Designed for engineers tired of 2GB RAM Electron/JVM bloat. Instant cold start, 120 FPS data grid, multi-engine support, and safe production guards.",
    category: "Developer Tools",
    stack: ["Tauri v2", "Rust Core", "React 19", "PostgreSQL", "MySQL", "Snowflake", "Redis", "TypeScript"],
    githubUrl: "https://github.com/nerd-riot/db-nerd",
    demoUrl: "/download/dbnerd",
    downloadUrl: "/download/dbnerd",
    status: "Flagship / v0.1.0",
    isFlagship: true,
    highlights: [
      "~45-65MB RAM footprint (vs 1.5GB+ in legacy IDEs)",
      "120 FPS buttery smooth data grid with canvas acceleration",
      "Instant cold start (<250ms)",
      "Safe Mode for Production with mandatory confirmation guards",
    ],
    primaryImage: "/media/studio-preview.png",
    gallery: [
      {
        title: "TablePlus-style Studio Layout",
        description: "Zero bloat. Minimal chrome, instant keyboard navigation, multi-tab query runner.",
        src: "/media/studio-preview.png",
      },
      {
        title: "120 FPS High-Density Data Grid",
        description: "Hardware-accelerated rendering handles hundreds of thousands of rows without lag.",
        src: "/media/table-grid-view.png",
      },
      {
        title: "Unified Connection Manager",
        description: "Connect to PostgreSQL, MySQL, Snowflake, Redis with SSH tunneling and SSL profiles.",
        src: "/media/connection-manager.png",
      },
      {
        title: "Inline Cell Editor & Staged Commits",
        description: "Edit values in-place with instant syntax check and dry-run SQL preview before commit.",
        src: "/media/inline-edit-modal.png",
      },
      {
        title: "Live Database Observability",
        description: "Real-time connection pool monitoring, active queries, and slow query diagnostics.",
        src: "/media/observability-dashboard.png",
      },
      {
        title: "Snowflake Enterprise Connector",
        description: "Cloud data warehouse query execution, virtual warehouse selection, and schema trees.",
        src: "/media/snowflake-connector.png",
      },
    ],
  },
  {
    id: "pongo-kv",
    slug: "pongo-kv",
    name: "PongoKV",
    tagline: "Zero-allocation embedded LSM-tree key-value store",
    description:
      "An embedded write-ahead log & LSM storage engine written in Go. Designed for append-heavy telemetry pipelines and edge caches requiring sub-millisecond point lookups and zero garbage collection spikes on hot reads.",
    category: "Backend Systems",
    stack: ["Go 1.24", "LSM Tree", "WAL", "Memory-Mapped I/O", "CRC32 Checksums"],
    githubUrl: "https://github.com/nerd-riot",
    status: "In Development",
    highlights: [
      "Zero heap allocation on point get operations",
      "Crash-safe append-only Write-Ahead Log",
      "SSTable compaction with bloom filters for fast lookups",
    ],
    primaryImage: "/images/nerd-riot-hero.jpg",
  },
  {
    id: "term-pulse",
    slug: "term-pulse",
    name: "TermPulse",
    tagline: "GPU-accelerated terminal multiplexer & metrics HUD",
    description:
      "A fast, distraction-free terminal HUD designed for engineers managing distributed services. Integrates system telemetry, process trees, and container stats directly inside your tmux/zsh session.",
    category: "Developer Tools",
    stack: ["Rust", "WGPU", "Alacritty-term", "Cross-Platform"],
    githubUrl: "https://github.com/nerd-riot",
    status: "Alpha",
    highlights: [
      "Hardware-rendered font glyphs via Metal/DirectX",
      "Built-in container & socket inspector",
      "Sub-5ms keyboard input latency",
    ],
    primaryImage: "/media/observability-dashboard.png",
  },
  {
    id: "sql-tap",
    slug: "sql-tap",
    name: "SQL-Tap",
    tagline: "Low-overhead eBPF packet sniffer for Postgres wire protocol",
    description:
      "Inspect and benchmark live database queries in staging or production environments without configuring pgaudit extensions or restarting the PostgreSQL daemon. Analyzes wire packets via kernel eBPF probes.",
    category: "Open Source",
    stack: ["eBPF", "C", "Go", "Postgres Wire Protocol", "Linux Kernel"],
    githubUrl: "https://github.com/nerd-riot",
    status: "Research",
    highlights: [
      "Zero client application modification required",
      "<1% CPU overhead at 50,000 queries per second",
      "Extracts query hashes, latency histograms, and lock times",
    ],
    primaryImage: "/media/query-history.png",
  },
];
