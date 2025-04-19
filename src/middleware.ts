import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);

async function verifyToken(token: string) {
  try {
    await jwtVerify(token, JWT_SECRET_KEY);
    return true;
  } catch (error) {
    console.error("❌ JWT verification failed:", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const adminToken = request.cookies.get('admin_token')?.value;
  const userToken = request.cookies.get('token')?.value;
  const affiliateToken = request.cookies.get('affiliate_token')?.value;
  const host = request.headers.get('host');
  const subdomain = host?.split('.')[0] || '';

  // Skip middleware for static files
  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/static/') || url.pathname.startsWith('/images/')) {
    return NextResponse.next();
  }

  // Redirect /admin/ to /admin/login
  if (url.pathname === '/admin' || url.pathname === '/admin/') {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // Restrict access to /admin/* (except /admin/login) if admin_token is missing or invalid
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    if (!adminToken || !(await verifyToken(adminToken))) {
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  // Restrict access to /studio/* if token is missing or invalid
  if (url.pathname.startsWith('/studio')) {
    if (!userToken || !(await verifyToken(userToken))) {
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
  }

  // Restrict access to /webgl/* if token is missing or invalid

  const referer = request.headers.get('referer') || '';
  // console.log(referer)
  if (url.pathname.startsWith('/webgl')) {
    if (!userToken || !(await verifyToken(userToken))) {
      if(referer.includes("/studio") || referer.includes("/webgl")){
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    }
  }

  // Restrict access to /affiliate/* if token is missing or invalid
  if (url.pathname.startsWith('/affiliate') && url.pathname !== '/affiliate-signin') {
    if (!affiliateToken || !(await verifyToken(affiliateToken))) {
      url.pathname = '/affiliate-signin';
      return NextResponse.redirect(url);
    }
  }

  // Handle subdomain routing for 'blog'
  if (subdomain === 'blog') {
    url.pathname = `/blog${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], // Apply middleware to all routes
  runtime: 'experimental-edge', // Use Edge runtime
};