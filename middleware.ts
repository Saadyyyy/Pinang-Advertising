import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for admin routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    // Check for authentication token in cookies
    const token = request.cookies.get('auth-token');
    
    if (!token) {
      // Redirect to login if no token
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - public routes
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|$).*)',
  ],
};