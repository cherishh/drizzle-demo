'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { feedback } from '@/lib/db/schema';

// 定义初始状态类型
type initialState = {
  error: string | null;
  success: boolean;
};

export type FeedbackState = initialState;

export async function submitFeedback(prevState: FeedbackState, formData: FormData) {
  // 这里不需要再 use server, 单独 file 中顶层使用 use server，下面所有 export async function 均自动成为 server actions
  const content = formData.get('content')?.toString() || '';
  const email = formData.get('email')?.toString() || '';

  if (!content || !email) {
    return { error: '请填写所有必填字段', success: false };
  }

  try {
    await db.insert(feedback).values({
      content,
      email,
      createdAt: new Date(),
    });

    revalidatePath('/feedback');
    return { error: '', success: true };
  } catch (error) {
    return { error: `提交失败，请稍后重试: ${error}`, success: false };
  }
}
