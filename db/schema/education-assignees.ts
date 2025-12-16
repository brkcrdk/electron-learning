import { sql } from 'drizzle-orm';
import { integer, sqliteTable, index, foreignKey, unique } from 'drizzle-orm/sqlite-core';

import { educations } from './educations';
import { users } from './users';

export const educationAssignees = sqliteTable(
  'education_assignees',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    educationId: integer('education_id').notNull(),
    assigneeUserId: integer('assignee_user_id').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  table => [
    index('idx_education_assignees_education_id').on(table.educationId),
    index('idx_education_assignees_assignee_user_id').on(table.assigneeUserId),
    unique('unique_education_user').on(table.educationId, table.assigneeUserId),
    foreignKey({
      columns: [table.educationId],
      foreignColumns: [educations.id],
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.assigneeUserId],
      foreignColumns: [users.id],
    }),
  ]
);

export type EducationAssignee = typeof educationAssignees.$inferSelect;
export type MutateEducationAssigneePayload = typeof educationAssignees.$inferInsert;
