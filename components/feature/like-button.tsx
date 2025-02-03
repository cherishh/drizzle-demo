'use client';

import { useOptimistic, startTransition } from 'react';
import { incrementLikes } from '@/app/actions/feedback/actions';
import { clsx } from 'clsx';
import { toast } from 'sonner';
export function LikeButton({ id, likes }: { id: number; likes: number }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state: number) => state + 1
  );

  const handleLike = () => {
    startTransition(async () => {
      try {
        addOptimisticLike(likes);
        await incrementLikes(id);
      } catch (error) {
        console.error(error);
        toast.error('Failed to like');
      }
    });
  };

  return (
    <button onClick={handleLike} className={clsx('flex items-center gap-1')}>
      <span className='text-sm'>👍</span>
      <span className='text-sm'>{optimisticLikes}</span>
    </button>
  );
}
