import { NextRequest, NextResponse } from "next/server";

// Mapping of asset IDs to target release binaries
// In production, this can also query Supabase `release_assets` table
const ASSET_REGISTRY: Record<string, { filename: string; fallbackUrl: string }> = {
  "dbnerd-macos-arm64-v0.1.0": {
    filename: "DBNerd_0.1.0_aarch64.dmg",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases/latest",
  },
  "dbnerd-macos-x64-v0.1.0": {
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
    userAgent,
    referer,
    country,
    timestamp: new Date().toISOString(),
  });

  // If R2 custom download base URL is configured in environment:
  const downloadBaseUrl = process.env.DOWNLOAD_BASE_URL; // e.g. https://download.nerd-riot.dev

  if (downloadBaseUrl && asset) {
    const r2Url = `${downloadBaseUrl}/dbnerd/0.1.0/${asset.filename}`;
    return NextResponse.redirect(r2Url, 302);
  }

  // Fallback to GitHub Release or fallback URL
  if (asset) {
    return NextResponse.redirect(asset.fallbackUrl, 302);
  }

  return NextResponse.json({ error: "Asset not found" }, { status: 404 });
}
