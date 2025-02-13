import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await auth();

  if (!user.userId) {
    redirect('/sign-in');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre className='overflow-auto rounded-lg bg-gray-100 p-4'>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
    </div>
  );
}
