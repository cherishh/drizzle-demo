import { NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/todo(.*)']);
const intlMiddleware = createIntlMiddleware(routing);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const isApiRoute =
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.startsWith('/trpc/');

  // For API routes, apply protection and return
  if (isApiRoute) {
    if (isProtectedRoute(request)) await auth.protect();
    return NextResponse.next();
  }

  // For non-API routes, continue with protection and internationalization
  if (isProtectedRoute(request)) await auth.protect();
  return intlMiddleware(request);
});

export const config = {
  matcher: [
    // API 路由
    '/api/:path*',
    '/trpc/:path*',

    // next-intl 国际化匹配规则
    '/',
    '/(zh|en)/:path*',

    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|api|trpc|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
