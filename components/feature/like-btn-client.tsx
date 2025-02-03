'use client';

import { useState } from 'react';
import { incrementLikes } from '@/app/actions/feedback/actions';
import { clsx } from 'clsx';
import { toast } from 'sonner';
export function LikeButtonClient({
  likes: initialLikes,
  id,
}: {
  likes: number;
  id: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [pending, setPending] = useState(false);

  const handleLike = async () => {
    try {
      setPending(true);
      await incrementLikes(id);
      setLikes(likes + 1);
    } catch (error) {
      console.error(error);
      toast.error('Failed to like');
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      disabled={pending}
      onClick={handleLike}
      className={clsx('flex items-center gap-1', pending && 'opacity-50')}
    >
      <span className='text-sm'>👍</span>
      <span className='text-sm'>{likes}</span>
    </button>
  );
}
