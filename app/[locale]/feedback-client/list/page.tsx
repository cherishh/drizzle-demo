'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { LikeButtonClient } from '@/components/feature/like-btn-client';

type Feedback = {
  id: number;
  email: string;
  content: string;
  likes: number;
};

// 这里才用了传统的 react 开发模式。如果要使用 useOptimistic则需要重新划分components，在 FeedbackItem 中同时使用 Optimistic 和 useState
export default function FeedbackListPage() {
  const t = useTranslations('feedback.list');

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const fetchFeedbacks = async () => {
    const feedbacks = await fetch('/api/feedback').then((res) => res.json());
    setFeedbacks(feedbacks);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className='mx-auto max-w-2xl p-4'>
      <h1 className='mb-6 text-2xl font-bold'>{t('title')}</h1>
      {feedbacks.length > 0 ? (
        <FeedbackList feedbacks={feedbacks} />
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
}

function FeedbackList({ feedbacks }: { feedbacks: Feedback[] }) {
  return (
    <ul className='space-y-4'>
      {feedbacks.map((feedback) => (
        <li key={feedback.id} className='rounded bg-white p-4 shadow'>
          <div className='mb-2 text-sm text-gray-500'>{feedback.email}</div>
          <div className='text-gray-700'>{feedback.content}</div>
          <div className='flex justify-end text-gray-500'>
            <LikeButtonClient id={feedback.id} likes={feedback.likes} />
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
