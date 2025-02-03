import { Suspense } from 'react';
import { db } from '@/lib/db';
import { feedback } from '@/lib/db/schema';
import { useTranslations } from 'next-intl';
import { LikeButton } from '@/components/feature/like-button';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

async function FeedbackList() {
  const feedbacks = await db
    .select()
    .from(feedback)
    .orderBy(desc(feedback.createdAt));

  return (
    <ul className='space-y-4'>
      {feedbacks.map((feedback) => (
        <li key={feedback.id} className='rounded bg-white p-4 shadow'>
          <div className='mb-2 text-sm text-gray-500'>{feedback.email}</div>
          <div className='text-gray-700'>{feedback.content}</div>
          <div className='flex justify-end text-gray-500'>
            <LikeButton id={feedback.id} likes={feedback.likes} />
          </div>
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

// 在 react 官方关于 useOptimistic 的文档中这里应该是一个 client component。此处使用 useState + await,
// 而在子组件内使用 useOptimistic, 这样自然在子组件内先显示了 optimistic 的值，随后请求完成在父组件更新为真实值。
// 这里的做法是父组件为 server component，子组件触发 action 后 revalidatePath。
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
