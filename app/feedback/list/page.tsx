import { Suspense } from 'react';
import { db } from '@/lib/db';
import { feedback } from '@/lib/db/schema';

export const dynamic = 'force-dynamic';

async function FeedbackList() {
  const feedbacks = await db.select().from(feedback);

  return (
    <ul className='space-y-4'>
      {feedbacks.map(feedback => (
        <li key={feedback.id} className='p-4 bg-white rounded shadow'>
          <div className='text-sm text-gray-500 mb-2'>{feedback.email}</div>
          <div className='text-gray-700'>{feedback.content}</div>
        </li>
      ))}
    </ul>
  );
}

function LoadingSkeleton() {
  return (
    <div className='space-y-4'>
      {[1, 2, 3].map(i => (
        <div key={i} className='p-4 bg-white rounded shadow animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-2'></div>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
        </div>
      ))}
    </div>
  );
}

export default function FeedbackListPage() {
  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>反馈列表</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <FeedbackList />
      </Suspense>
    </div>
  );
}
