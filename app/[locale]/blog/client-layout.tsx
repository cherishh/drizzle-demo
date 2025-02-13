'use client';

import { BlogContext } from './blog-context';
import { type Post } from './blog-context';

interface ClientBlogLayoutProps {
  children: React.ReactNode;
  idSlugMap: Record<string, string>;
  posts: Post[];
}

export default function ClientBlogLayout({
  children,
  idSlugMap,
  posts,
}: ClientBlogLayoutProps) {
  return (
    <BlogContext.Provider value={{ idSlugMap, posts }}>
      {children}
    </BlogContext.Provider>
  );
}
