'use client';

import { Link } from '@/i18n/routing';
import { ModeToggle } from '@/components/shared/toggle-theme';
import { LocaleSwitcher } from '@/components/shared/locale-switcher';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  return (
    <div className='m-4 text-center'>
      <header className='flex flex-row items-center justify-end gap-4'>
        <h1 className='flex-grow text-2xl font-bold'>{t('title')}</h1>
        <div className='flex flex-row items-center gap-2'>
          <ModeToggle />
          <LocaleSwitcher />
        </div>
      </header>
      <br />
      <nav className='flex flex-row items-center justify-center gap-4'>
        <Link href='/feedback'>{t('feedback')}</Link>
        <Link href='/feedback/list'>{t('feedbackList')}</Link>
        <Link prefetch={false} href='/detail'>
          {t('detail')}
        </Link>
        <Link prefetch={false} href='/detail/123'>
          detail/123
        </Link>
        <Link href='/image-test'>{t('imageTest')}</Link>
        <Link href='/todo'>{t('todo')}</Link>
        <Link href='/about'>{t('about')}</Link>
      </nav>
    </div>
  );
}
