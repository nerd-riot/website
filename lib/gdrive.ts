/**
 * Helper to fetch and stream files from Google Drive while bypassing virus scan warnings.
 * Keeps the Google Drive URL completely hidden from the end user.
 */
export async function streamFromGoogleDrive(fileIdOrUrl: string, fallbackFilename: string) {
  // Extract file ID if full Google Drive URL was provided
  const fileId = extractGoogleDriveId(fileIdOrUrl);
  if (!fileId) {
    throw new Error("Invalid Google Drive File ID or URL");
  }

  const initialUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  // Step 1: Initial request
  const initialRes = await fetch(initialUrl, {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    redirect: "follow",
  });

  const contentType = initialRes.headers.get("content-type") || "";

  // If Google Drive directly streams the file (usually for <25MB files)
  if (!contentType.includes("text/html") && initialRes.body) {
    return createStreamResponse(initialRes, fallbackFilename);
  }

  // Step 2: Handle Google Drive "large file virus scan warning" page (>25MB or executables)
  const html = await initialRes.text();
  
  // Extract form action and inputs (id, export, confirm, uuid)
  const formActionMatch = html.match(/<form[^>]+action="([^"]+)"/);
  const formAction = formActionMatch ? formActionMatch[1] : "https://drive.usercontent.google.com/download";
  
  const queryParams = new URLSearchParams();
  const inputMatches = [...html.matchAll(/<input[^>]+name="([^"]+)"[^>]+value="([^"]*)"/g)];
  for (const m of inputMatches) {
    queryParams.set(m[1], m[2]);
  }

  // Ensure mandatory fallback params if inputs missing
  if (!queryParams.has("id")) queryParams.set("id", fileId);
  if (!queryParams.has("export")) queryParams.set("export", "download");
  if (!queryParams.has("confirm")) {
    const confirmMatch = html.match(/confirm=([0-9a-zA-Z_-]+)/);
    queryParams.set("confirm", confirmMatch ? confirmMatch[1] : "t");
  }

  const downloadUrl = `${formAction}?${queryParams.toString()}`;
  const cookies = initialRes.headers.get("set-cookie") || "";

  const confirmedRes = await fetch(downloadUrl, {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Cookie: cookies,
    },
    redirect: "follow",
  });

  if (!confirmedRes.ok || !confirmedRes.body) {
    throw new Error(`Google Drive responded with status: ${confirmedRes.status}`);
  }

  return createStreamResponse(confirmedRes, fallbackFilename);
}

function createStreamResponse(res: Response, filename: string): Response {
  const headers = new Headers();
  
  // Content disposition: force browser to download with clean filename
  headers.set("Content-Disposition", `attachment; filename="${filename}"`);
  
  // Determine appropriate content type
  const isDmg = filename.endsWith(".dmg");
  const isZip = filename.endsWith(".zip");
  const isTar = filename.endsWith(".tar.gz");

  if (isDmg) {
    headers.set("Content-Type", "application/x-apple-diskimage");
  } else if (isZip) {
    headers.set("Content-Type", "application/zip");
  } else if (isTar) {
    headers.set("Content-Type", "application/gzip");
  } else {
    headers.set("Content-Type", res.headers.get("content-type") || "application/octet-stream");
  }

  const contentLength = res.headers.get("content-length");
  if (contentLength) {
    headers.set("Content-Length", contentLength);
  }

  // Cache control: allow browser download caching
  headers.set("Cache-Control", "public, max-age=86400, s-maxage=86400");

  return new Response(res.body, {
    status: 200,
    headers,
  });
}

export function extractGoogleDriveId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  
  // If it's already just the raw file ID (no slashes)
  if (!trimmed.includes("/") && !trimmed.includes("http")) {
    return trimmed;
  }

  // Handle https://drive.google.com/file/d/{ID}/view...
  const matchD = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchD) return matchD[1];

  // Handle https://drive.google.com/open?id={ID} or uc?id={ID}
  const matchId = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchId) return matchId[1];

  return trimmed;
}
