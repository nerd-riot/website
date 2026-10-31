import { NextRequest, NextResponse } from "next/server";
import { streamFromGoogleDrive } from "@/lib/gdrive";

interface AssetEntry {
  channel: "release" | "beta";
  filename: string;
  directUrl?: string;
  envKey?: string;
  defaultFileId?: string;
  fallbackFolderUrl: string;
}

const GDRIVE_BETA_FOLDER = "https://drive.google.com/drive/folders/1UyCPmcmzTasiJujR3QbRgV573UmApLeX?usp=drive_link";
const GDRIVE_RELEASE_FOLDER = "https://drive.google.com/drive/folders/178UfDA2B63ZosCGT-bLjMVzH29MgjUC4?usp=drive_link";
const GITHUB_RELEASE_V124 = "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.4";
const GITHUB_RELEASE_V123 = "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.3";
const GITHUB_RELEASE_V122 = "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.2";

const ASSET_REGISTRY: Record<string, AssetEntry> = {
  // Release v1.2.4 (Official GitHub Releases CDN)
  "dbnerd-release-macos-arm64-v1.2.4": {
    channel: "release",
    filename: "DBNerd_1.2.4_aarch64.dmg",
    directUrl: `${GITHUB_RELEASE_V124}/DBNerd_1.2.4_aarch64.dmg`,
    fallbackFolderUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.4",
  },
  "dbnerd-release-macos-zip-v1.2.4": {
    channel: "release",
    filename: "DBNerd_1.2.4_macOS_aarch64.zip",
    directUrl: `${GITHUB_RELEASE_V124}/DBNerd_1.2.4_macOS_aarch64.zip`,
    fallbackFolderUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.4",
  },
  "dbnerd-release-windows-setup-v1.2.4": {
    channel: "release",
    filename: "DBNerd_1.2.4_Windows_x64_Setup.exe",
    directUrl: `${GITHUB_RELEASE_V124}/DBNerd_1.2.4_Windows_x64_Setup.exe`,
    fallbackFolderUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.4",
  },
  "dbnerd-release-windows-standalone-v1.2.4": {
    channel: "release",
    filename: "DBNerd_1.2.4_Windows_x64_standalone.exe",
    directUrl: `${GITHUB_RELEASE_V124}/DBNerd_1.2.4_Windows_x64_standalone.exe`,
    fallbackFolderUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.4",
  },

  // Release v1.2.3 (Official GitHub Releases CDN)
  "dbnerd-release-macos-arm64-v1.2.3": {
    channel: "release",
    filename: "DBNerd_1.2.3_aarch64.dmg",
    directUrl: `${GITHUB_RELEASE_V123}/DBNerd_1.2.3_aarch64.dmg`,
    fallbackFolderUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.3",
  },
  "dbnerd-release-macos-zip-v1.2.3": {
    channel: "release",
    filename: "DBNerd_1.2.3_macOS_aarch64.zip",
    directUrl: `${GITHUB_RELEASE_V123}/DBNerd_1.2.3_macOS_aarch64.zip`,
    fallbackFolderUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.3",
  },
  "dbnerd-release-windows-setup-v1.2.3": {
    channel: "release",
    filename: "DBNerd_1.2.3_Windows_x64_Setup.exe",
    directUrl: `${GITHUB_RELEASE_V123}/DBNerd_1.2.3_Windows_x64_Setup.exe`,
    fallbackFolderUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.3",
  },
  "dbnerd-release-windows-standalone-v1.2.3": {
    channel: "release",
    filename: "DBNerd_1.2.3_Windows_x64_standalone.exe",
    directUrl: `${GITHUB_RELEASE_V123}/DBNerd_1.2.3_Windows_x64_standalone.exe`,
    fallbackFolderUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.3",
  },

  // Release v1.2.2 (Official GitHub Releases CDN)
  "dbnerd-release-macos-arm64-v1.2.2": {
    channel: "release",
    filename: "DBNerd_1.2.2_aarch64.dmg",
    directUrl: `${GITHUB_RELEASE_V122}/DBNerd_1.2.2_aarch64.dmg`,
    fallbackFolderUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.2",
  },
  "dbnerd-release-macos-zip-v1.2.2": {
    channel: "release",
    filename: "DBNerd_1.2.2_macOS_aarch64.zip",
    directUrl: `${GITHUB_RELEASE_V122}/DBNerd_1.2.2_macOS_aarch64.zip`,
    fallbackFolderUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.2",
  },
  "dbnerd-release-windows-setup-v1.2.2": {
    channel: "release",
    filename: "DBNerd_1.2.2_Windows_x64_Setup.exe",
    directUrl: `${GITHUB_RELEASE_V122}/DBNerd_1.2.2_Windows_x64_Setup.exe`,
    fallbackFolderUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.2",
  },
  "dbnerd-release-windows-standalone-v1.2.2": {
    channel: "release",
    filename: "DBNerd_1.2.2_Windows_x64_standalone.exe",
    directUrl: `${GITHUB_RELEASE_V122}/DBNerd_1.2.2_Windows_x64_standalone.exe`,
    fallbackFolderUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.2",
  },

  // Release (Stable) Channel legacy
  "dbnerd-release-macos-arm64-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_aarch64.dmg",
    envKey: "GDRIVE_DBNERD_RELEASE_MAC_ARM64",
    fallbackFolderUrl: GDRIVE_RELEASE_FOLDER,
  },
  "dbnerd-release-macos-x64-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_x64.dmg",
    envKey: "GDRIVE_DBNERD_RELEASE_MAC_X64",
    fallbackFolderUrl: GDRIVE_RELEASE_FOLDER,
  },
  "dbnerd-release-windows-setup-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_Windows_x64_Setup.exe",
    envKey: "GDRIVE_DBNERD_RELEASE_WIN_SETUP",
    fallbackFolderUrl: GDRIVE_RELEASE_FOLDER,
  },

  // Beta Channel - pre-wired directly to uploaded Google Drive file IDs
  "dbnerd-beta-macos-arm64-v0.1.0": {
    channel: "beta",
    filename: "DBNerd_Beta_0.1.0_aarch64.dmg",
    envKey: "GDRIVE_DBNERD_BETA_MAC_ARM64",
    defaultFileId: "1StnGQwTd-xKj64IdWTO0a8K0ee9-8HDw",
    fallbackFolderUrl: GDRIVE_BETA_FOLDER,
  },
  "dbnerd-beta-macos-zip-v0.1.0": {
    channel: "beta",
    filename: "DBNerd_Beta_0.1.0_macOS_aarch64.zip",
    envKey: "GDRIVE_DBNERD_BETA_MAC_ZIP",
    defaultFileId: "1liDIcUj-Bjy7lDTzSSMPnthvbAu_7dLT",
    fallbackFolderUrl: GDRIVE_BETA_FOLDER,
  },
  "dbnerd-beta-macos-x64-v0.1.0": {
    channel: "beta",
    filename: "DBNerd_Beta_0.1.0_x64.dmg",
    envKey: "GDRIVE_DBNERD_BETA_MAC_X64",
    fallbackFolderUrl: GDRIVE_BETA_FOLDER,
  },
  "dbnerd-beta-windows-setup-v0.1.0": {
    channel: "beta",
    filename: "DBNerd_Beta_0.1.0_Windows_x64_Setup.exe",
    envKey: "GDRIVE_DBNERD_BETA_WIN_SETUP",
    defaultFileId: "1YBZrB3dgQDST1ApD4qF5M0R1h33oaoQi",
    fallbackFolderUrl: GDRIVE_BETA_FOLDER,
  },
  "dbnerd-beta-windows-standalone-v0.1.0": {
    channel: "beta",
    filename: "DBNerd_Beta_0.1.0_Windows_x64_standalone.exe",
    envKey: "GDRIVE_DBNERD_BETA_WIN_STANDALONE",
    defaultFileId: "1ICq038YVe9FL4XnEwwqy5YExxyHuBY_a",
    fallbackFolderUrl: GDRIVE_BETA_FOLDER,
  },

  // Legacy aliases
  "dbnerd-macos-arm64-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_aarch64.dmg",
    envKey: "GDRIVE_DBNERD_RELEASE_MAC_ARM64",
    fallbackFolderUrl: GDRIVE_RELEASE_FOLDER,
  },
  "dbnerd-macos-x64-v0.1.0": {
    channel: "release",
    filename: "DBNerd_0.1.0_x64.dmg",
    envKey: "GDRIVE_DBNERD_RELEASE_MAC_X64",
    fallbackFolderUrl: GDRIVE_RELEASE_FOLDER,
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
          platform: assetId.includes("windows") ? "windows" : "macos",
          architecture: assetId.includes("arm64") ? "arm64" : "x64",
          user_agent: userAgent,
          referer: referer,
          country_code: country,
        }),
      }).catch((err) => console.error("Telemetry log error:", err));
    } catch {}
  }

  // 1. Direct High-Speed CDN URL (e.g., GitHub Releases)
  if (asset.directUrl) {
    return NextResponse.redirect(asset.directUrl, 302);
  }

  // 2. If individual Google Drive File ID / Share link is set in Environment or Default:
  // BFF streams the file directly to the client with hidden Google Drive URL!
  const gdriveId = (asset.envKey ? process.env[asset.envKey] : undefined) || asset.defaultFileId;

  if (gdriveId && gdriveId.trim().length > 0) {
    try {
      return await streamFromGoogleDrive(gdriveId, asset.filename);
    } catch (gdriveErr) {
      console.error(`Error streaming from Google Drive for ${assetId}:`, gdriveErr);
      return NextResponse.redirect(asset.fallbackFolderUrl, 302);
    }
  }

  // 2. Fallback to Google Drive channel folder
  return NextResponse.redirect(asset.fallbackFolderUrl, 302);
}
