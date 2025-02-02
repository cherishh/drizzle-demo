import { Suspense } from 'react';
import { db } from '@/lib/db';
import { feedback } from '@/lib/db/schema';
import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

async function FeedbackList() {
  const feedbacks = await db.select().from(feedback);

  return (
    <ul className='space-y-4'>
      {feedbacks.map((feedback) => (
        <li key={feedback.id} className='rounded bg-white p-4 shadow'>
          <div className='mb-2 text-sm text-gray-500'>{feedback.email}</div>
          <div className='text-gray-700'>{feedback.content}</div>
        </li>
      ))}
    </ul>
  );
}

function LoadingSkeleton() {
  return (
    <div className='space-y-4'>
      {[1, 2, 3].map((i) => (
        <div key={i} className='animate-pulse rounded bg-white p-4 shadow'>
          <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
          <div className='h-4 w-3/4 rounded bg-gray-200'></div>
        </div>
      ))}
    </div>
  );
}

export default function FeedbackListPage() {
  const t = useTranslations('feedback.list');

  return (
    <div className='mx-auto max-w-2xl p-4'>
      <h1 className='mb-6 text-2xl font-bold'>{t('title')}</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <FeedbackList />
      </Suspense>
    </div>
  );
}
