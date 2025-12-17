import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, index, foreignKey } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const categories = sqliteTable(
  'categories',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull().default(''),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull().default(''),
    parentId: integer('parent_id'),
    createdBy: integer('created_by').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  table => [
    index('idx_category_parent_id').on(table.parentId),
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.createdBy],
      foreignColumns: [users.id],
    }),
  ]
);

export type Category = typeof categories.$inferSelect;
export type MutateCategoryPayload = Omit<typeof categories.$inferInsert, 'createdBy' | 'createdAt' | 'updatedAt'>;

export type CategoryWithChildren = Category & {
  children: CategoryWithChildren[];
};
