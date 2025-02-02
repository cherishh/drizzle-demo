'use client';
import { use } from 'react';

export default function BookDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div>
      <h1>BookDetail</h1>
      <p>{id}</p>
    </div>
  );
}
