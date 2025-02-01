'use client';

import Link from 'next/link';
import { ModeToggle } from '@/components/shared/toggle-theme';

export default function Home() {
  return (
    <div className='text-center m-4'>
      <h1>Test</h1>
      <div className='flex flex-row gap-4 justify-end items-center'>
        <ModeToggle />
      </div>
      <br />
      <div className='flex flex-row gap-4 justify-center items-center'>
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
