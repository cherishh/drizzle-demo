'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { submitForm } from '../../actions/feedback/actions';
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

export default function FeedbackPage() {
  const t = useTranslations('feedback');
  const [isPending, startTransition] = useTransition();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(
      createFeedbackFormSchema((key) => {
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
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('content', data.content);

        const result = await submitForm(formData);
        if (result.success) {
          form.reset();
          toast.success('success');
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : '提交失败');
      }
    });
  }

  return (
    <div className='mx-auto max-w-2xl p-4'>
      <h1 className='mb-6 text-2xl font-bold'>{t('title')}</h1>

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
                    disabled={isPending}
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
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isPending}>
            {isPending ? t('submitting') : t('submit')}
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
