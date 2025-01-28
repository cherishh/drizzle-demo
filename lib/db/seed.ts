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
    await db.insert(books).values([
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
    ]);
    console.log('✅ Books 数据填充成功');
  } catch (error) {
    console.error('❌ Books 数据填充失败:', error);
    throw error;
  }
}

async function seedAuthors() {
  // 填充 authors 表
}

// 主 seed 函数
async function seed() {
  try {
    // 可以控制是否清空表
    if (process.env.RESET_DB === 'true') {
      console.log('🗑️ 清空所有表...');
      await db.delete(booksToAuthors);
      await db.delete(feedback);
      await db.delete(books);
      await db.delete(authors);
    }

    // 定义所有 seed 函数
    const seedFunctions = [
      { name: 'Feedback', fn: seedFeedback },
      { name: 'Books', fn: seedBooks },
      { name: 'Authors', fn: seedAuthors },
      // 将来可以在这里添加更多表的 seed 函数
    ];

    // 执行所有 seed 函数
    for (const { name, fn } of seedFunctions) {
      console.log(`🌱 开始填充 ${name} 数据...`);
      await fn();
    }

    console.log('✨ 所有数据填充完成！');
  } catch (error) {
    console.error('❌ 数据填充过程中出现错误:', error);
  } finally {
    process.exit(0);
  }
}

// 运行 seed
seed();
