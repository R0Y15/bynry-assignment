import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if it's an admin path
  const isAdminPath = path.startsWith('/admin');
  const isAdminSignInPath = path === '/admin/signin';

  // Get the token from the request cookies
  const token = request.cookies.get('adminToken')?.value;

  // If it's an admin path but not the sign-in page, check for authentication
  if (isAdminPath && !isAdminSignInPath) {
    if (!token) {
      // Redirect to sign-in if no token is present
      return NextResponse.redirect(new URL('/admin/signin', request.url));
    }
  }

  // If user is already authenticated and tries to access sign-in page
  if (isAdminSignInPath && token) {
    // Redirect to admin dashboard
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Configure the middleware to run only on admin routes
export const config = {
  matcher: '/admin/:path*',
}; 