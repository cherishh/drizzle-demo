'use client';

import { useParams } from 'next/navigation';
import { useBlogContext } from '../blog-context';
import { useState, useEffect } from 'react';
import NotionRenderer from '@/components/feature/notion-renderer';
import { ExtendedRecordMap } from 'notion-types';
import { LoadingIcon } from '@/components/shared/loading-icon';

export default function BlogPage() {
  // url: /blog/example-slug
  const params = useParams();
  const slug = params.slug as string;

  const { idSlugMap } = useBlogContext();

  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const id = Object.keys(idSlugMap).find((key) => idSlugMap[key] === slug);

  useEffect(() => {
    async function fetchData() {
      if (!id) {
        setError('Post not found');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/notion/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setRecordMap(data);
      } catch (error) {
        console.error('获取文章数据失败:', error);
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    fetchData();
  }, [id]);

  if (error) {
    return (
      <div className='flex h-full items-center justify-center text-red-500'>
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingIcon className='h-8 w-8' />
      </div>
    );
  }

  return (
    <article className='mx-auto max-w-3xl'>
      {recordMap && <NotionRenderer data={recordMap} idToSlug={idSlugMap} />}
    </article>
  );
}
