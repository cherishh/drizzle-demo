'use client';

import Link from 'next/link';
import { ModeToggle } from '@/components/shared/toggle-theme';

export default function Home() {
  return (
    <div className='m-4 text-center'>
      <header className='flex flex-row items-center justify-end gap-4'>
        <h1 className='flex-grow text-2xl font-bold'>Test</h1>
        <div>
          <ModeToggle />
        </div>
      </header>
      <br />
      <div className='flex flex-row items-center justify-center gap-4'>
        <Link href='/feedback'>Feedback</Link>
        <Link href='/feedback/list'>Feedback List</Link>
        <Link prefetch={false} href='/detail'>
          detail
        </Link>
        <Link prefetch={false} href='/detail/123'>
          detail/123
        </Link>
        <Link href='/image-test'>image test</Link>
        <Link href='/todo'>todo app</Link>
      </div>
    </div>
  );
}
