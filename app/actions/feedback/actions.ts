'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { feedback } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { ratelimit } from '@/app/api/ratelimit';
import { auth } from '@clerk/nextjs/server';
import posthog from 'posthog-js';

// 定义初始状态类型
type initialState = {
  error: string | null;
  success: boolean;
};

export type FeedbackState = initialState;

// NOTE deprecated, use submitForm instead
export async function submitFeedback(
  prevState: FeedbackState,
  formData: FormData
) {
  const user = await auth();
  if (!user.userId) {
    return { error: '请先登录', success: false };
  }

  // 这里不需要再 use server, 单独 file 中顶层使用 use server，下面所有 export async function 均自动成为 server actions
  const content = formData.get('content')?.toString() || '';
  const email = formData.get('email')?.toString() || '';

  if (!content || !email) {
    return { error: '请填写所有必填字段', success: false };
  }

  const identifier = user.userId;
  console.log('identifier', identifier);
  const { success } = await ratelimit.limit(identifier);
  if (!success) {
    return {
      error: 'ratelimited: 提交过于频繁，请稍后再试',
      success: false,
    };
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

export async function submitForm(formData: FormData) {
  const user = await auth();
  if (!user.userId) {
    return { error: '请先登录', success: false };
  }

  const content = formData.get('content')?.toString() || '';
  const email = formData.get('email')?.toString() || '';

  if (!content || !email) {
    return { error: '请填写所有必填字段', success: false };
  }

  const identifier = user.userId;
  console.log('identifier', identifier);
  const { success } = await ratelimit.limit(identifier);
  if (!success) {
    posthog.capture('ratelimited', {
      email,
    });
    return {
      error: 'ratelimited: 提交过于频繁，请稍后再试',
      success: false,
    };
  }

  try {
    await db.insert(feedback).values({
      content,
      email,
      createdAt: new Date(),
    });
    return { error: '', success: true };
  } catch (error) {
    return { error: `提交失败，请稍后重试: ${error}`, success: false };
  }
}

export async function incrementLikes(id: number) {
  try {
    await db
      .update(feedback)
      .set({
        likes: sql`${feedback.likes} + 1`,
      })
      .where(eq(feedback.id, id));

    revalidatePath('/feedback/list');
  } catch (error) {
    console.error(error);
    return { error: `点赞失败，请稍后重试: ${error}`, success: false };
  }
}
