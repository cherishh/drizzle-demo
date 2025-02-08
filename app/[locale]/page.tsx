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
        <Link href='/image-test'>{t('imageTest')}</Link>
        <Link href='/blog/how-to-use-drizzle-with-nextjs-15'>{t('blog')}</Link>
        <Link href='/todo'>({t('todo')})</Link>
        <Link href='/dashboard'>(Dashboard)</Link>
      </nav>
      <div className='mt-8 flex-1'>
        <p>this is a test app for nextjs 15, RSC, drizzle, neon, oauth, etc.</p>
        <p>I&apos;m trying to glue all these features together.</p>
        <p>should be easy but experiencing some issues with auth.</p>
      </div>
      <footer className='flex flex-row items-center justify-center gap-2 text-sm'>
        <Link href='/term-of-service'>Term Of Service</Link>
        <span className='text-muted-foreground'>·</span>
        <Link href='/privacy'>Privacy Policy</Link>
      </footer>
    </div>
  );
}
