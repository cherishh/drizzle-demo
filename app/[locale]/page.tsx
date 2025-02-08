'use client';

// 不能使用 i18n 的 routing 否则clerk的保护失效
// import { Link } from '@/i18n/routing';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  return (
    <div className='flex h-full flex-col'>
      <nav className='flex flex-row items-center justify-center gap-4'>
        <Link href='/feedback'>{t('feedback')}</Link>
        <Link href='/feedback/list'>{t('feedbackList')}</Link>
        <Link href='/feedback-client/list'>{t('feedbackList')}(client)</Link>
        <Link prefetch={false} href='/detail'>
          {t('detail')}
        </Link>
        <Link prefetch={false} href='/detail/123'>
          detail/[123]
        </Link>
        <Link href='/image-test'>{t('imageTest')}</Link>
        <Link href='/todo'>{t('todo')}</Link>
        <Link href='/about'>{t('about')}</Link>
        <Link href='/dashboard'>dashboard</Link>
      </nav>
      <div className='flex-1'>
        <p>this is a test app for nextjs 15, RSC, drizzle, neon, oauth, etc.</p>
        <p>i&apos;m trying to glue all these features together.</p>
      </div>
      <footer className='flex flex-row items-center justify-center gap-2 text-sm'>
        <Link href='/term-of-service'>Term Of Service</Link>
        <span className='text-muted-foreground'>·</span>
        <Link href='/privacy'>Privacy Policy</Link>
      </footer>
    </div>
  );
}
