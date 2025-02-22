import { NextResponse } from "next/server";

export const GET = () => {
  const robotsTxt = `
    User-agent: *
    Allow: /
    Disallow: /admin
    Sitemap: https://yourdomain.com/sitemap.xml
  `.trim();

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
