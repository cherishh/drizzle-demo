'use client';

import { useParams } from 'next/navigation';
import { useBlogContext } from '../blog-context';
import { Suspense, useState, useEffect } from 'react';
import NotionRenderer from '@/components/feature/notion-renderer';
import { ExtendedRecordMap } from 'notion-types';
import { Loading } from '@/components/shared/loading';

export default function BlogPage() {
  // url: /blog/example-slug
  const params = useParams();
  const slug = params.slug as string;

  const { idSlugMap } = useBlogContext();
  const findId = (slug: string) => {
    return Object.keys(idSlugMap).find((key) => idSlugMap[key] === slug);
  };

  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [idToSlug, setIdToSlug] = useState<Record<string, string>>({});
  const id = findId(slug);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/notion/${id}`);
        const data = await response.json();
        setRecordMap(data);
        // idToSlug 可以从 context 中获取
        setIdToSlug(idSlugMap);
      } catch (error) {
        console.error('获取文章数据失败:', error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id, idSlugMap]);

  return (
    <article className='mx-auto max-w-3xl'>
      <Suspense fallback={<Loading />}>
        {recordMap && idToSlug && (
          <NotionRenderer data={recordMap} idToSlug={idToSlug} />
        )}
      </Suspense>
    </article>
  );
}
