import { pgTable, serial, varchar, text, boolean, integer, timestamp, foreignKey } from "drizzle-orm/pg-core";
import { reviews } from "./ReviewSchema.js";
// Users
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  isAdmin: boolean('is_admin').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  
});