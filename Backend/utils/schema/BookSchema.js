 import { pgTable, serial, varchar, text, boolean, integer, timestamp, foreignKey } from "drizzle-orm/pg-core";
 import { users } from "./UserSchema.js";
 import { reviews } from "./ReviewSchema.js";
 export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    description: text('description'),
    genre: varchar('genre', { length: 100 }),
    coverImageUrl: text('cover_image_url'),
    averageRating: integer('average_rating').default(0),
    ratingsCount: integer('ratings_count').default(0),
    createdBy: integer('created_by').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    
  });