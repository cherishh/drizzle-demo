'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { submitFeedback } from '../../actions/feedback/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createFeedbackFormSchema, type FeedbackFormValues } from './schema';
import { useTransition } from 'react';

// 初始状态
const initialState = {
  error: '',
  success: false,
};

export default function FeedbackPage() {
  const t = useTranslations('feedback');
  const [state, formAction, pending] = useActionState(
    submitFeedback,
    initialState
  );
  const [isPending, startTransition] = useTransition();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(
      createFeedbackFormSchema((key) => {
        // 由于 t 只能访问 feedback 命名空间，我们需要移除前缀
        const validationKey = key.replace('feedback.', '');
        return t(validationKey);
      })
    ),
    defaultValues: {
      email: '',
      content: '',
    },
  });

  async function onSubmit(data: FeedbackFormValues) {
    startTransition(() => {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('content', data.content);
      formAction(formData);
    });
  }

  const isLoading = pending || isPending;

  if (state.success) {
    toast('success.');
  }

  return (
    <div className='mx-auto max-w-2xl p-4'>
      <h1 className='mb-6 text-2xl font-bold'>{t('title')}</h1>

      {state.error && (
        <div
          className={`mb-4 rounded p-4 ${state.success ? 'bg-green-100' : 'bg-red-100'}`}
        >
          {state.error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('email')} <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('email_placeholder')}
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('message')} <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('message_placeholder')}
                    rows={4}
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isLoading}>
            {isLoading ? t('submitting') : t('submit')}
          </Button>
        </form>
      </Form>
      <p>
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:{' '}
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      </p>
    </div>
  );
}
