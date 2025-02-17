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
    // next-intl 国际化匹配规则
    '/',
    '/(zh|en)/:path*',

    // based on clerk
    // 排除 ingest 路径。ingest 是为了 posthog rewrites手动添加的，其他部分 clerk 添加。
    // 排除 xml 路径。sitemap 不需要 locale
    '/((?!ingest|_next|api|trpc|[^?]*\\.(?:html?|xml|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
