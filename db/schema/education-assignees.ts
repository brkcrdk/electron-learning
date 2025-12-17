import { sql } from 'drizzle-orm';
import { integer, sqliteTable, index, foreignKey, unique } from 'drizzle-orm/sqlite-core';

import { educationAssignments } from './education-assignment';
import { users } from './users';

export const educationAssignees = sqliteTable(
  'education_assignees',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    assignmentId: integer('assignment_id').notNull(),
    assigneeUserId: integer('assignee_user_id').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  table => [
    index('idx_education_assignees_assignment_id').on(table.assignmentId),
    index('idx_education_assignees_assignee_user_id').on(table.assigneeUserId),
    unique('unique_assignment_user').on(table.assignmentId, table.assigneeUserId),
    foreignKey({
      columns: [table.assignmentId],
      foreignColumns: [educationAssignments.id],
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.assigneeUserId],
      foreignColumns: [users.id],
    }),
  ]
);

export type EducationAssignee = typeof educationAssignees.$inferSelect;
export type MutateEducationAssigneePayload = typeof educationAssignees.$inferInsert;
