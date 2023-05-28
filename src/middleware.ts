import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
}

export const config = {
  matcher: ['/', '/gift-holders', '/sell'],
};
