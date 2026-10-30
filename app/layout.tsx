import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    "developer tools",
    "systems engineering",
    "database client",
    "Tauri v2",
    "Rust",
    "Go",
    "PostgreSQL",
    "open source",
    "DBNerd",
  ],
  authors: [{ name: "NERD RIOT Engineers", url: siteConfig.links.github }],
  creator: "NERD RIOT",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Engineering Collective`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@nerd_riot",
  },
  icons: {
    icon: "/brand/avatar-concept-1-rebel-prompt.svg",
    shortcut: "/brand/avatar-concept-1-rebel-prompt.svg",
    apple: "/brand/avatar-concept-1-rebel-prompt.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#111318] text-[#F4F4F5] antialiased selection:bg-accent selection:text-[#111318]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
