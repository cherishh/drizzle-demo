import type { InferSelectModel } from 'drizzle-orm';
import { db } from '@/lib/db';
import { feedback, books, authors, booksToAuthors } from '@/lib/db/schema';

// 为每个表创建独立的 seed 函数
async function seedFeedback() {
  try {
    await db.insert(feedback).values([
      {
        email: 'user1@example.com',
        content: '这是第一条测试反馈。',
        createdAt: new Date(),
      },
      {
        email: 'user2@example.com',
        content: '这是第二条测试反馈，网站体验很好！',
        createdAt: new Date(),
      },
    ]);
    console.log('✅ Feedback 数据填充成功');
  } catch (error) {
    console.error('❌ Feedback 数据填充失败:', error);
    throw error; // 向上传递错误
  }
}

async function seedBooks() {
  try {
    const insertedBooks = await db
      .insert(books)
      .values([
        {
          title: '三国演义',
          isbn: '9787020008728',
          publishYear: 1522,
          publisher: '人民文学出版社',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: '红楼梦',
          isbn: '9787020002207',
          publishYear: 1791,
          publisher: '人民文学出版社',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .returning(); // 返回插入的数据
    console.log('✅ Books 数据填充成功');
    return insertedBooks;
  } catch (error) {
    console.error('❌ Books 数据填充失败:', error);
    throw error;
  }
}

async function seedAuthors() {
  try {
    const insertedAuthors = await db
      .insert(authors)
      .values([
        {
          name: '罗贯中',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '曹雪芹',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .returning(); // 返回插入的数据
    console.log('✅ Authors 数据填充成功');
    return insertedAuthors;
  } catch (error) {
    console.error('❌ Authors 数据填充失败:', error);
    throw error;
  }
}

type Book = InferSelectModel<typeof books>;
type Author = InferSelectModel<typeof authors>;

async function seedBooksToAuthors(books: Book[], authors: Author[]) {
  try {
    await db.insert(booksToAuthors).values([
      {
        bookId: books[0].id, // 使用实际插入的 ID
        authorId: authors[0].id,
        createdAt: new Date(),
      },
      {
        bookId: books[1].id,
        authorId: authors[1].id,
        createdAt: new Date(),
      },
    ]);
    console.log('✅ BooksToAuthors 关系数据填充成功');
  } catch (error) {
    console.error('❌ BooksToAuthors 关系数据填充失败:', error);
    throw error;
  }
}

// 主 seed 函数
async function seed() {
  try {
    if (process.env.RESET_DB === 'true') {
      console.log('🗑️ 清空所有表...');
      await db.delete(booksToAuthors);
      await db.delete(feedback);
      await db.delete(books);
      await db.delete(authors);
    }

    // 先填充基础数据并保存返回值
    await seedFeedback();
    const insertedBooks = await seedBooks();
    const insertedAuthors = await seedAuthors();

    // 使用实际的 ID 填充关系表
    await seedBooksToAuthors(insertedBooks, insertedAuthors);

    console.log('✨ 所有数据填充完成！');
  } catch (error) {
    console.error('❌ 数据填充过程中出现错误:', error);
  } finally {
    process.exit(0);
  }
}

// 运行 seed
seed();
