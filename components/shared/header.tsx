'use client';

import { useTranslations } from 'next-intl';
import { ModeToggle } from '@/components/shared/toggle-theme';
import { LocaleSwitcher } from '@/components/shared/locale-switcher';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import logo from '@/public/vercel.svg';

export function Header() {
  const t = useTranslations('common');
  return (
    <div className='m-4 text-center'>
      <header className='flex flex-row items-center justify-end gap-4'>
        <div className='flex flex-row items-center gap-2'>
          <Link href='/' className='hover:text-primary'>
            <Image src={logo} width={25} alt='Logo' priority />
          </Link>
        </div>
        <h1 className='flex-grow text-2xl font-bold'>{t('title')}</h1>
        <div className='flex flex-row items-center gap-2'>
          <ModeToggle />
          <LocaleSwitcher />
        </div>
      </header>
      <br />
    </div>
  );
}
