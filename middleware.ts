import { NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/todo(.*)']);
const intlMiddleware = createIntlMiddleware(routing);
const allowedOrigins = ['https://tuxihub.com', 'https://drizzle-demo.fly.dev'];
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default clerkMiddleware(async (auth, request: NextRequest) => {
  // Check if it's an API route
  const isApiRoute =
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.startsWith('/trpc/');

  // Check the origin from the request
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  // Apply CORS headers
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // For API routes, apply protection and return
  if (isApiRoute) {
    if (isProtectedRoute(request)) await auth.protect();
    return response;
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
