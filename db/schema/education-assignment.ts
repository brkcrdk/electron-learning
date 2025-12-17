import { sql } from 'drizzle-orm';
import { integer, sqliteTable, index, foreignKey } from 'drizzle-orm/sqlite-core';

import { educations } from './educations';
import { users } from './users';

export const educationAssignments = sqliteTable(
  'education_assignments',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    educationId: integer('education_id').notNull(),
    createdBy: integer('created_by').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  table => [
    index('idx_education_assignments_education_id').on(table.educationId),
    index('idx_education_assignments_created_by').on(table.createdBy),
    foreignKey({
      columns: [table.educationId],
      foreignColumns: [educations.id],
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.createdBy],
      foreignColumns: [users.id],
    }),
  ]
);

export type EducationAssignment = typeof educationAssignments.$inferSelect;

export type MutateEducationAssignmentPayload = Omit<typeof educationAssignments.$inferInsert, 'createdBy' | 'createdAt' | 'updatedAt'> & {
  assigneeUserIds: number[];
};
