import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { project, category, rating, email, message } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // In production with Supabase configured:
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/feedback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            project_id: project,
            category: category || "general",
            rating: rating || null,
            email: email || null,
            message: message.trim(),
            status: "new",
          }),
        });
      } catch (dbErr) {
        console.error("Failed to insert into Supabase feedback:", dbErr);
      }
    } else {
      console.log("[Feedback Submitted (Local Mode)]", {
        project,
        category,
        rating,
        email,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true, message: "Feedback submitted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error processing feedback" },
      { status: 500 }
    );
  }
}
