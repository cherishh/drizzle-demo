import { Suspense } from 'react';
import { getPublishedPosts } from '@/lib/notion';
import ClientBlogLayout from './client-layout';
import { LoadingIcon } from '@/components/shared/loading-icon';

// 创建一个异步组件来处理数据获取
async function BlogPosts({ children }: { children: React.ReactNode }) {
  const posts = await getPublishedPosts();
  const idSlugMap = posts.reduce<Record<string, string>>((acc, post) => {
    acc[post.id] = post.slug;
    return acc;
  }, {});

  return (
    <ClientBlogLayout idSlugMap={idSlugMap} posts={posts}>
      <div>{children}</div>
    </ClientBlogLayout>
  );
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className='flex h-full items-center justify-center'>
          <LoadingIcon className='h-8 w-8' />
        </div>
      }
    >
      <BlogPosts>{children}</BlogPosts>
    </Suspense>
  );
}
