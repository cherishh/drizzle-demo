import { db } from '@/lib/db';
import { feedback } from '@/lib/db/schema';

async function FeedbackListPage() {
  const feedbacks = await db.select().from(feedback);

  return (
    <div>
      <h1>反馈列表</h1>
      <ul>
        {feedbacks.map(feedback => (
          <li key={feedback.email}>{feedback.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackListPage;
