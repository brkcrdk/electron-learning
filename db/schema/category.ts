import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core';

export const category = sqliteTable(
  'category',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description'),
    parentId: integer('parent_id').references(() => category.id),
    hasChildren: integer('has_children', { mode: 'boolean' }).notNull().default(false),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  table => [index('idx_category_parent_id').on(table.parentId)]
);

export type Category = typeof category.$inferSelect;
export type NewCategoryPayload = typeof category.$inferInsert;
