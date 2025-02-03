import * as z from 'zod';

export const createFeedbackFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({
      message: t('feedback.validation.email'),
    }),
    content: z.string().min(1, {
      message: t('feedback.validation.message'),
    }),
  });

export type FeedbackFormValues = z.infer<
  ReturnType<typeof createFeedbackFormSchema>
>;
