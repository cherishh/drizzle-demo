import { Toaster } from '@/components/ui/sonner';

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Toaster position='top-right' />
    </div>
  );
}
