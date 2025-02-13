'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  coverImage: string;
}

const formatDate = (date: string) => format(new Date(date), 'yyyy-MM-dd');

export function BlogCard({
  slug,
  title,
  description,
  publishDate,
  coverImage,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className='group relative cursor-pointer overflow-hidden'>
        <div className='relative h-48'>
          <Image
            src={coverImage || '/placeholder.svg'}
            alt={title}
            fill
            className='object-cover'
          />
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-4 text-muted-foreground'>{description}</p>
          <p className='text-sm text-muted-foreground'>
            {formatDate(publishDate)}
          </p>
        </CardContent>
        <div className='absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <ArrowRight className='h-6 w-6 text-primary' />
        </div>
      </Card>
    </Link>
  );
}
