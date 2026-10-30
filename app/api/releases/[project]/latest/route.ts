import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ project: string }> }
) {
  const { project } = await params;
  const { searchParams } = new URL(request.url);
  const channel = (searchParams.get("channel") || "release").toLowerCase();
  const downloadBase = process.env.DOWNLOAD_BASE_URL || "https://download.nerd-riot.dev";

  if (project.toLowerCase() !== "dbnerd" && project.toLowerCase() !== "db-nerd") {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const isBeta = channel === "beta";
  const version = isBeta ? "v0.1.0-beta.2" : "v0.1.0";
  const appTarName = isBeta ? "DBNerd_Beta.app.tar.gz" : "DBNerd.app.tar.gz";

  // Official Tauri v2 updater manifest schema
  const updaterManifest = {
    version,
    notes: isBeta
      ? "DBNerd Beta: experimental features, Snowflake connector preview, and bug fixes."
      : "DBNerd v0.1.0 Stable: high-performance native database studio.",
    pub_date: isBeta ? "2026-10-30T12:00:00Z" : "2026-10-29T12:00:00Z",
    platforms: {
      "darwin-aarch64": {
        signature: "dW5zdXBwb3J0ZWRfc2lnbmF0dXJlX3BsYWNlaG9sZGVy",
        url: `${downloadBase}/dbnerd/${isBeta ? "beta" : "release"}/0.1.0/darwin/arm64/${appTarName}`,
      },
      "darwin-x86_64": {
        signature: "dW5zdXBwb3J0ZWRfc2lnbmF0dXJlX3BsYWNlaG9sZGVy",
        url: `${downloadBase}/dbnerd/${isBeta ? "beta" : "release"}/0.1.0/darwin/x64/${appTarName}`,
      },
      "windows-x86_64": {
        signature: "dW5zdXBwb3J0ZWRfc2lnbmF0dXJlX3BsYWNlaG9sZGVy",
        url: `${downloadBase}/dbnerd/${isBeta ? "beta" : "release"}/0.1.0/windows/x64/DBNerd_0.1.0_x64-setup.nsis.zip`,
      },
    },
  };

  return NextResponse.json(updaterManifest, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=180, s-maxage=300",
    },
  });
}
