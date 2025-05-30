'use client';

// 不能使用 i18n 的 routing 否则clerk的保护失效
// import { Link } from '@/i18n/routing';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black'>
      {/* Hero Section */}
      <div className='relative overflow-hidden'>
        {/* Background Pattern */}
        <div className='bg-grid-pattern absolute inset-0 opacity-5'></div>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10'></div>

        <div className='relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32'>
          {/* Main Content */}
          <div className='text-center'>
            <div className='mx-auto max-w-4xl'>
              <h1 className='mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-white dark:via-gray-200 dark:to-gray-400 sm:text-5xl lg:text-6xl'>
                Nextjs 15 template
              </h1>

              <div className='mx-auto max-w-3xl space-y-6'>
                <div className='rounded-2xl bg-white/60 p-8 shadow-xl ring-1 ring-gray-200/50 backdrop-blur-sm dark:bg-gray-800/60 dark:ring-gray-700/50'>
                  <h3 className='mb-4 text-xl font-semibold text-gray-900 dark:text-white'>
                    Todos
                  </h3>
                  <ul className='space-y-2 text-left text-sm text-gray-700 dark:text-gray-300'>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>add drizzle</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>add DB, connect to postgres</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>
                        test RSC, server actions, form, zod, fetch, etc.(e.g.
                        contact form)
                      </span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>add theme</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>test next Image component</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>add i18n/next Intl</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>setup shadcn/ui</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>setup domain/SSL related</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>
                        add auth/clerk - ❗not good, use `better-auth` instead.
                      </span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>setup CI</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>secret leaking check</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-gray-400'>❌</span>
                      <span className='text-gray-500 line-through'>
                        add payload/CMS(deprecated)
                      </span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>
                        using notion as CMS. maybe not needed, MDX is fine.
                      </span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>add notion/blog</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>add analytics/posthog</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>add redis/upstash rate limit</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-gray-400'>❌</span>
                      <span className='text-gray-500 line-through'>
                        add logging/sentry(not working well, need investigation)
                      </span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-gray-400'>✅</span>
                      <span>deploy to vercel & fly.io</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>✅</span>
                      <span>sitemap</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-yellow-500'>✅</span>
                      <span>file for a us company</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-yellow-500'>⏳</span>
                      <span>get a stripe account</span>
                    </li>
                  </ul>
                </div>

                <div className='rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 shadow-xl ring-1 ring-blue-200/50 dark:from-blue-900/20 dark:to-purple-900/20 dark:ring-blue-700/50'>
                  <p className='text-lg leading-relaxed text-gray-700 dark:text-gray-300'>
                    {t('main_content')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='relative border-t border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/50'>
        <div className='mx-auto max-w-7xl px-6 py-8'>
          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <div className='flex items-center gap-4 text-sm'>
              <Link
                href='/term-of-service'
                className='text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              >
                服务条款
              </Link>
              <span className='text-gray-400 dark:text-gray-600'>·</span>
              <Link
                href='/privacy'
                className='text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              >
                隐私政策
              </Link>
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-500'>
              © 2024 Next.js Demo App. Built with ❤️
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
