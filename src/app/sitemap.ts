import { NextResponse } from "next/server";

const BASE_URL = "https://yourdomain.com"; // Replace with your actual domain

export async function GET() {
  // Define your static routes
  const staticRoutes = ["/", "/about", "/contact", "/blog"];

  // Convert routes to XML format
  const urls = staticRoutes
    .map((route) => `<url><loc>${BASE_URL}${route}</loc></url>`)
    .join("");

  // Full sitemap XML structure
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`.trim();

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
