'use client';
import { use } from 'react';

type Params = Promise<{ id: string }>;

export default function BookDetail({ params }: { params: Params }) {
  const { id } = use(params);

  return (
    <div>
      <h1>BookDetail</h1>
      <p>{id}</p>
    </div>
  );
}
