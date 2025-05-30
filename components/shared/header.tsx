'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ModeToggle } from '@/components/shared/toggle-theme';
import { LocaleSwitcher } from '@/components/shared/locale-switcher';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export function Header() {
  const t = useTranslations('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 border-b border-gray-200/20 bg-white/60 backdrop-blur-md dark:border-gray-700/20 dark:bg-gray-900/60'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <div className='flex items-center gap-4'>
          <Link href='/' className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white'>
              <span className='text-sm font-bold text-white dark:text-black'>
                J
              </span>
            </div>
            <span className='text-lg font-semibold text-gray-900 dark:text-white'>
              NAME
            </span>
          </Link>
        </div>

        <div className='hidden items-center gap-6 md:flex'>
          <Link href='/'>{t('home')}</Link>
          <Link
            href='/feedback'
            className='text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          >
            {t('feedback')}
          </Link>
          <Link
            href='/feedback/list'
            className='text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          >
            {t('feedbackList')}
          </Link>
          <Link
            href='/feedback-client/list'
            className='text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          >
            {t('feedbackList')}(client)
          </Link>
          <Link
            href='/blog'
            className='text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          >
            {t('blog')}
          </Link>
          <Link
            href='/dashboard'
            className='text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          >
            {t('dashboard')}
          </Link>
        </div>

        <div className='flex items-center gap-3'>
          <ModeToggle />
          <LocaleSwitcher />
          <SignedOut>
            <div className='flex items-center gap-2'>
              <SignInButton>
                <button className='rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'>
                  登录
                </button>
              </SignInButton>
              <SignUpButton>
                <button className='rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'>
                  注册
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button
            className='flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            <svg
              className='h-5 w-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className='border-t border-gray-200/20 bg-white/50 backdrop-blur-md dark:border-gray-700/20 dark:bg-gray-900/50 md:hidden'>
          <div className='mx-auto max-w-7xl px-6 py-4'>
            <div className='grid gap-3'>
              <Link
                href='/feedback'
                className='block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('feedback')}
              </Link>
              <Link
                href='/feedback/list'
                className='block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('feedbackList')}
              </Link>
              <Link
                href='/feedback-client/list'
                className='block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('feedbackList')}(client)
              </Link>
              <Link
                href='/blog'
                className='block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('blog')}
              </Link>
              <Link
                href='/image-test'
                className='block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('imageTest')}
              </Link>
              <Link
                href='/dashboard'
                className='block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className='border-t border-gray-200/30 pt-3 dark:border-gray-600/30'>
                <SignedOut>
                  <div className='grid gap-2'>
                    <SignInButton>
                      <button className='w-full rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'>
                        登录
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className='w-full rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'>
                        注册
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className='flex items-center gap-2 px-3 py-2'>
                    <UserButton />
                    <span className='text-sm text-gray-700 dark:text-gray-300'>
                      账户设置
                    </span>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
