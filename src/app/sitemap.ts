import { NextResponse } from "next/server";

const BASE_URL = "https://yourdomain.com"; // Replace with your actual domain

export const GET = async () => {
  const staticRoutes = ["/", "/about", "/contact", "/blog"];

  const urls = staticRoutes
    .map((route) => `<url><loc>${BASE_URL}${route}</loc></url>`)
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`.trim();

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
