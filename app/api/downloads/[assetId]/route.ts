import { NextRequest, NextResponse } from "next/server";

// Mapping of asset IDs to target release binaries across Release (Stable) and Beta channels
const ASSET_REGISTRY: Record<
  string,
  { channel: "release" | "beta"; filename: string; fallbackUrl: string }
> = {
  // Release (Stable) Channel
  "dbnerd-release-macos-arm64-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_aarch64.dmg",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases/latest",
  },
  "dbnerd-release-macos-x64-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_x64.dmg",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases/latest",
  },
  // Beta Channel
  "dbnerd-beta-macos-arm64-v0.1.0": {
    channel: "beta",
    filename: "DBNerd_Beta_0.1.0_aarch64.dmg",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases",
  },
  "dbnerd-beta-macos-x64-v0.1.0": {
    channel: "beta",
    filename: "DBNerd_Beta_0.1.0_x64.dmg",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases",
  },
  // Legacy aliases
  "dbnerd-macos-arm64-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_aarch64.dmg",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases/latest",
  },
  "dbnerd-macos-x64-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_x64.dmg",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases/latest",
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assetId: string }> }
) {
  const { assetId } = await params;
  const asset = ASSET_REGISTRY[assetId];

  // Telemetry recording
  const userAgent = request.headers.get("user-agent") || "unknown";
  const referer = request.headers.get("referer") || "direct";
  const country = request.headers.get("cf-ipcountry") || "unknown";

  console.log(`[Telemetry] Download requested for asset: ${assetId}`, {
    channel: asset?.channel || "unknown",
    userAgent,
    referer,
    country,
    timestamp: new Date().toISOString(),
  });

  // If Cloudflare R2 custom download base URL is configured in environment:
  // Structure: /{project}/{channel}/{version}/{filename}
  const downloadBaseUrl = process.env.DOWNLOAD_BASE_URL; // e.g. https://download.nerd-riot.dev

  if (downloadBaseUrl && asset) {
    const r2Url = `${downloadBaseUrl}/dbnerd/${asset.channel}/0.1.0/${asset.filename}`;
    return NextResponse.redirect(r2Url, 302);
  }

  // Fallback to GitHub Release or fallback URL
  if (asset) {
    return NextResponse.redirect(asset.fallbackUrl, 302);
  }

  return NextResponse.json({ error: "Asset not found" }, { status: 404 });
}
