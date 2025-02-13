'use client';

import { createContext, useContext } from 'react';

export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  coverImage: string;
}

interface BlogContextType {
  idSlugMap: Record<string, string>;
  posts: Post[];
}

export const BlogContext = createContext<BlogContextType | null>(null);

export function useBlogContext() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogContextProvider');
  }
  return context;
}
