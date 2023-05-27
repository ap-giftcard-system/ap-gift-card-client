import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkJWTExpiration } from '@/utils/jwtChecker';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('SESSIONID')?.value;
  const { pathname } = request.nextUrl;

  // if there's accessToken && pathname === '/ => redirect to /sell
  if (accessToken && pathname === '/') {
    return NextResponse.redirect(new URL('/sell', request.url));
  }

  // if no accessToken, redirect to /
  if (!accessToken && pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // logout if access token is expired
  if (checkJWTExpiration(accessToken as string)) {
    return NextResponse.redirect(new URL('/logout', request.url));
  }
}

export const config = {
  matcher: ['/', '/gift-holders', '/sell'],
};
