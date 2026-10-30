import { Hero } from "@/components/sections/Hero";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Engineering } from "@/components/sections/Engineering";
import { OpenSource } from "@/components/sections/OpenSource";

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero (Dark) */}
      <Hero />

      {/* Section 2: What We Build (Light) */}
      <WhatWeBuild />

      {/* Section 3: Featured Projects (Dark) */}
      <FeaturedProjects />

      {/* Section 4: Engineering Philosophy (Light) */}
      <Engineering />

      {/* Section 5: Open Source & Community (Dark) */}
      <OpenSource />
    </>
  );
}
