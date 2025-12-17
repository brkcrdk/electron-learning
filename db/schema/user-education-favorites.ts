import { sql } from 'drizzle-orm';
import { integer, sqliteTable, index, foreignKey, unique } from 'drizzle-orm/sqlite-core';

import { educations } from './educations';
import { users } from './users';

export const userEducationFavorites = sqliteTable(
  'user_education_favorites',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull(),
    educationId: integer('education_id').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  table => [
    index('idx_user_education_favorites_user_id').on(table.userId),
    index('idx_user_education_favorites_education_id').on(table.educationId),
    unique('unique_user_education_favorite').on(table.userId, table.educationId),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.educationId],
      foreignColumns: [educations.id],
    }).onDelete('cascade'),
  ]
);

export type UserEducationFavorite = typeof userEducationFavorites.$inferSelect;
export type MutateUserEducationFavoritePayload = typeof userEducationFavorites.$inferInsert;
