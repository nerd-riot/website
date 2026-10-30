import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ project: string }> }
) {
  const { project } = await params;
  const downloadBase = process.env.DOWNLOAD_BASE_URL || "https://download.nerd-riot.dev";

  if (project.toLowerCase() !== "dbnerd" && project.toLowerCase() !== "db-nerd") {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // Official Tauri v2 updater manifest schema
  const updaterManifest = {
    version: "v0.1.0",
    notes: "DBNerd v0.1.0 initial release. High-performance native database studio.",
    pub_date: "2026-10-29T12:00:00Z",
    platforms: {
      "darwin-aarch64": {
        signature: "dW5zdXBwb3J0ZWRfc2lnbmF0dXJlX3BsYWNlaG9sZGVy",
        url: `${downloadBase}/dbnerd/0.1.0/darwin/arm64/DBNerd.app.tar.gz`,
      },
      "darwin-x86_64": {
        signature: "dW5zdXBwb3J0ZWRfc2lnbmF0dXJlX3BsYWNlaG9sZGVy",
        url: `${downloadBase}/dbnerd/0.1.0/darwin/x64/DBNerd.app.tar.gz`,
      },
      "windows-x86_64": {
        signature: "dW5zdXBwb3J0ZWRfc2lnbmF0dXJlX3BsYWNlaG9sZGVy",
        url: `${downloadBase}/dbnerd/0.1.0/windows/x64/DBNerd_0.1.0_x64-setup.nsis.zip`,
      },
    },
  };

  return NextResponse.json(updaterManifest, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, s-maxage=600",
    },
  });
}
