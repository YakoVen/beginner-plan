import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Basic check if session cookie exists
    // (Full verification happens on the server via adminAuth in API/Server actions if needed, 
    // but Next.js middleware edge runtime can't run firebase-admin directly)
    if (!session) {
      // Allow the layout to render the login form by passing a custom header
      // or we can redirect to a specific login page. Since login is handled in dashboard layout,
      // we let it pass but we add a header that layout can read, or just rely on client-side
      // Wait, if we redirect, they have no /login page, it's inside /dashboard layout!
      // Let's pass a header that says not authenticated.
      const response = NextResponse.next();
      response.headers.set('x-middleware-cache', 'no-store');
      response.headers.set('Cache-Control', 'no-store, max-age=0');
      return response;
    }
  }

  const response = NextResponse.next();
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    response.headers.set('x-middleware-cache', 'no-store');
    response.headers.set('Cache-Control', 'no-store, max-age=0');
  }
  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*'
  ],
};
