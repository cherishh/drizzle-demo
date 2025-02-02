import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  decimal,
  primaryKey,
  text,
} from 'drizzle-orm/pg-core';

// 作者表
export const authors = pgTable('authors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  livingCity: varchar('living_city', { length: 255 }),
  averageRating: decimal('average_rating', { precision: 3, scale: 2 }).default(
    '0.00'
  ),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 书籍表
export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  isbn: varchar('isbn', { length: 13 }).unique(),
  publishYear: integer('publish_year'),
  publisher: varchar('publisher', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 作者和书籍的多对多关系表
export const booksToAuthors = pgTable(
  'books_to_authors',
  {
    bookId: integer('book_id')
      .references(() => books.id)
      .notNull(),
    authorId: integer('author_id')
      .references(() => authors.id)
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey(table.bookId, table.authorId),
  })
);

// 反馈表
export const feedback = pgTable('feedback', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  content: text('content').notNull(),
  likes: integer('likes').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 定义关系
export const authorsRelations = relations(authors, ({ many }) => ({
  booksToAuthors: many(booksToAuthors),
}));

export const booksRelations = relations(books, ({ many }) => ({
  booksToAuthors: many(booksToAuthors),
}));

export const booksToAuthorsRelations = relations(booksToAuthors, ({ one }) => ({
  book: one(books, {
    fields: [booksToAuthors.bookId],
    references: [books.id],
  }),
  author: one(authors, {
    fields: [booksToAuthors.authorId],
    references: [authors.id],
  }),
}));
