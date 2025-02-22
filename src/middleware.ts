import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');
  const subdomain = host?.split('.')[0] || '';

  const url = request.nextUrl.clone();

  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/static/') || url.pathname.startsWith('/images/')) {
    return NextResponse.next();
  }

  if (subdomain === 'blog') {
    url.pathname = `/blog${url.pathname}`;
    return NextResponse.rewrite(url); // Rewrite the URL to the correct route
  }

  // Default handling for the main domain
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], // Apply middleware to all routes
};