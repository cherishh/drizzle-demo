'use client';

import { useActionState } from 'react';
import { toast } from 'sonner';
import { submitFeedback } from '../../actions/feedback/actions';
import { useTranslations } from 'next-intl';
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

  function SubmitButton() {
    return (
      <button
        type='submit'
        disabled={pending}
        className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300'
      >
        {pending ? t('submitting') : t('submit')}
      </button>
    );
  }

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

      <form action={formAction} className='space-y-4'>
        <div>
          <label htmlFor='email' className='mb-2 block'>
            {t('email')} <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            required
            className='w-full rounded border p-2'
            placeholder={t('email_placeholder')}
          />
        </div>

        <div>
          <label htmlFor='content' className='mb-2 block'>
            {t('message')} <span className='text-red-500'>*</span>
          </label>
          <textarea
            id='content'
            name='content'
            required
            rows={4}
            className='w-full rounded border p-2'
            placeholder={t('message_placeholder')}
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
