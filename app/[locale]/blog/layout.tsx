import { Suspense } from 'react';
import { getPublishedPosts } from '@/lib/notion';
import ClientBlogLayout from './client-layout';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await debugDatabaseSchema();

  const posts = await getPublishedPosts();
  console.log(posts, 'posts');
  const idSlugMap = posts.reduce<Record<string, string>>((acc, post) => {
    acc[post.id] = post.slug;
    return acc;
  }, {});
  console.log(idSlugMap, 'idSlugMap');

  return (
    <ClientBlogLayout idSlugMap={idSlugMap} posts={posts}>
      <div>
        <Suspense fallback={<div>Loading blog list...</div>}>
          {children}
        </Suspense>
      </div>
    </ClientBlogLayout>
  );
}
