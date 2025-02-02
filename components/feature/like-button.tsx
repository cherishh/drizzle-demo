'use client';

import { useOptimistic } from 'react';
import { incrementLikes } from '@/app/actions/feedback/actions';

export function LikeButton({ id, likes }: { id: number; likes: number }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state: number) => state + 1
  );

  const handleLike = async () => {
    addOptimisticLike(likes);
    await incrementLikes(id);
  };

  return (
    <button onClick={handleLike} className='flex items-center gap-1'>
      <span className='text-sm'>👍</span>
      <span className='text-sm'>{optimisticLikes}</span>
    </button>
  );
}
