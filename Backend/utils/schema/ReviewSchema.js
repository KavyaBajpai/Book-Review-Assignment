import { pgTable, serial, varchar, text, boolean, integer, timestamp, foreignKey } from "drizzle-orm/pg-core";
import { users } from "./UserSchema.js";
import { books } from "./BookSchema.js";
export const reviews = pgTable('reviews', {
    id: serial('id').primaryKey(),
    bookId: integer('book_id').notNull().references(() => books.id),
    userId: integer('user_id').notNull().references(() => users.id),
    rating: integer('rating').notNull(), 
    reviewText: text('review_text').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  });