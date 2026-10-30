import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_type, project, version, platform, architecture } = body;

    console.log(`[Telemetry] Update event: ${event_type}`, {
      project,
      version,
      platform,
      architecture,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, recorded: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid telemetry payload" }, { status: 400 });
  }
}
