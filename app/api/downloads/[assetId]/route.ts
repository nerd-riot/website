import { NextRequest, NextResponse } from "next/server";
import { streamFromGoogleDrive } from "@/lib/gdrive";

interface AssetEntry {
  channel: "release" | "beta";
  filename: string;
  envKey: string;
  fallbackUrl: string;
}

const ASSET_REGISTRY: Record<string, AssetEntry> = {
  // Release (Stable) Channel
  "dbnerd-release-macos-arm64-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_aarch64.dmg",
    envKey: "GDRIVE_DBNERD_RELEASE_MAC_ARM64",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases/latest",
  },
  "dbnerd-release-macos-x64-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_x64.dmg",
    envKey: "GDRIVE_DBNERD_RELEASE_MAC_X64",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases/latest",
  },
  // Beta Channel (macOS)
  "dbnerd-beta-macos-arm64-v0.1.0": {
    channel: "beta",
    filename: "DBNerd_Beta_0.1.0_aarch64.dmg",
    envKey: "GDRIVE_DBNERD_BETA_MAC_ARM64",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases",
  },
  "dbnerd-beta-macos-x64-v0.1.0": {
    channel: "beta",
    filename: "DBNerd_Beta_0.1.0_x64.dmg",
    envKey: "GDRIVE_DBNERD_BETA_MAC_X64",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases",
  },
  // Beta Channel (Windows)
  "dbnerd-beta-windows-setup-v0.1.0": {
    channel: "beta",
    filename: "DBNerd_Beta_0.1.0_Windows_x64_Setup.exe",
    envKey: "GDRIVE_DBNERD_BETA_WIN_SETUP",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases",
  },
  "dbnerd-beta-windows-standalone-v0.1.0": {
    channel: "beta",
    filename: "DBNerd_Beta_0.1.0_Windows_x64_standalone.exe",
    envKey: "GDRIVE_DBNERD_BETA_WIN_STANDALONE",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases",
  },
  // Legacy aliases
  "dbnerd-macos-arm64-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_aarch64.dmg",
    envKey: "GDRIVE_DBNERD_RELEASE_MAC_ARM64",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases/latest",
  },
  "dbnerd-macos-x64-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_x64.dmg",
    envKey: "GDRIVE_DBNERD_RELEASE_MAC_X64",
    fallbackUrl: "https://github.com/nerd-riot/db-nerd/releases/latest",
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assetId: string }> }
) {
  const { assetId } = await params;
  const asset = ASSET_REGISTRY[assetId];

  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  // Record Telemetry into Supabase
  const userAgent = request.headers.get("user-agent") || "unknown";
  const referer = request.headers.get("referer") || "direct";
  const country = request.headers.get("cf-ipcountry") || "unknown";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      fetch(`${supabaseUrl}/rest/v1/download_events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          project_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11", // DBNerd
          event_type: "download_requested",
          source: referer.includes("/releases") ? "website" : "direct",
          platform: "macos",
          architecture: assetId.includes("arm64") ? "arm64" : "x64",
          user_agent: userAgent,
          referer: referer,
          country_code: country,
        }),
      }).catch((err) => console.error("Telemetry log error:", err));
    } catch {}
  }

  // Check Google Drive configuration
  const gdriveId = process.env[asset.envKey];

  if (gdriveId && gdriveId.trim().length > 0) {
    try {
      // BFF streams the file from Google Drive directly to the client
      // The Google Drive URL is completely hidden from the user.
      return await streamFromGoogleDrive(gdriveId, asset.filename);
    } catch (gdriveErr) {
      console.error(`Error streaming from Google Drive for ${assetId}:`, gdriveErr);
      // Fallback to fallbackUrl if Google Drive stream fails
      return NextResponse.redirect(asset.fallbackUrl, 302);
    }
  }

  // Fallback to GitHub Release if Google Drive variable is not yet filled
  return NextResponse.redirect(asset.fallbackUrl, 302);
}
