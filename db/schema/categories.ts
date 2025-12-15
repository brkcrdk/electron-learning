import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, index, foreignKey } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable(
  'categories',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull(),
    parentId: integer('parent_id'),
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
    }),
  ]
);

export type Category = typeof categories.$inferSelect & {
  /**
   * NOTE: Bu değer veri tabanında saklanmaz. Category listesini alırken hesaplanır ve o sırada
   * gönderilir.
   */
  hasChildren: boolean;
};
export type NewCategoryPayload = typeof categories.$inferInsert;
