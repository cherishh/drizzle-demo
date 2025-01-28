'use client';

import { useActionState } from 'react';
import { submitFeedback } from './action';

// 初始状态
const initialState = {
  error: '',
  success: false,
};

// 客户端组件
export default function FeedbackPage() {
  const [state, formAction, pending] = useActionState(submitFeedback, initialState);

  function SubmitButton() {
    return (
      <button
        type='submit'
        disabled={pending}
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300'
      >
        {pending ? '提交中...' : '提交反馈'}
      </button>
    );
  }

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>用户反馈</h1>

      {state.error && (
        <div className={`p-4 mb-4 rounded ${state.success ? 'bg-green-100' : 'bg-red-100'}`}>{state.error}</div>
      )}

      <form action={formAction} className='space-y-4'>
        <div>
          <label htmlFor='email' className='block mb-2'>
            电子邮箱 <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            required
            className='w-full p-2 border rounded'
            placeholder='请输入您的邮箱'
          />
        </div>

        <div>
          <label htmlFor='content' className='block mb-2'>
            反馈内容 <span className='text-red-500'>*</span>
          </label>
          <textarea
            id='content'
            name='content'
            required
            rows={4}
            className='w-full p-2 border rounded'
            placeholder='请输入您的反馈内容'
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
