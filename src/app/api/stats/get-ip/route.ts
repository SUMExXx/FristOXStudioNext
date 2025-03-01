import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // Get real client IP from the x-forwarded-for header
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "Unknown IP";

  return Response.json({ ip });
}
