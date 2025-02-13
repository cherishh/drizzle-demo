'use client';

import { BlogCard } from '@/components/feature/blog-card';
import { useBlogContext } from './blog-context';

export default function BlogListPage() {
  const { posts } = useBlogContext();

  return (
    <div className='container mx-auto px-4 py-8'>
      <header className='mb-8 text-center'>
        <h1 className='mb-2 text-4xl font-bold'>My Tech Blog</h1>
        <p className='text-xl text-muted-foreground'>
          Exploring the world of web development
        </p>
      </header>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            slug={post.slug}
            title={post.title}
            description={post.description}
            publishDate={post.publishDate}
            coverImage={post.coverImage}
          />
        ))}
      </div>
    </div>
  );
}
