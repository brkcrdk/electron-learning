import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, index, foreignKey } from 'drizzle-orm/sqlite-core';

import { type Category, categories } from './categories';
import { type EducationMaterials, educationMaterials } from './education-materials';
import { type MediaFile, mediaFiles } from './media-files';
import { type User, users } from './users';

export const educations = sqliteTable(
  'educations',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description').notNull(),
    categoryId: integer('category_id').notNull(),
    coverImageId: integer('cover_image_id').notNull(),
    educationMaterial: integer('education_materials').notNull(),
    createdBy: integer('created_by').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  table => [
    index('idx_educations_category_id').on(table.categoryId),
    index('idx_educations_cover_image_id').on(table.coverImageId),
    index('idx_educations_education_material').on(table.educationMaterial),
    index('idx_educations_created_by').on(table.createdBy),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
    }),
    foreignKey({
      columns: [table.coverImageId],
      foreignColumns: [mediaFiles.id],
    }),
    foreignKey({
      columns: [table.educationMaterial],
      foreignColumns: [educationMaterials.id],
    }),
    foreignKey({
      columns: [table.createdBy],
      foreignColumns: [users.id],
    }),
  ]
);

export type Education = typeof educations.$inferSelect;
export type NewEducationPayload = typeof educations.$inferInsert;
export type CreateEducationPayload = Omit<NewEducationPayload, 'createdBy' | 'createdAt' | 'updatedAt'>;
export type CreateEducationWithAssigneesPayload = CreateEducationPayload & { assigneeIds: number[] };
export type UpdateEducationWithAssigneesPayload = NewEducationPayload & { assigneeIds: number[] };
export type EducationListItem = Omit<Education, 'categoryId' | 'coverImageId' | 'educationMaterial' | 'createdBy'> & {
  category: Category;
  coverImage: MediaFile;
  educationMaterial: EducationMaterials;
  createdBy: User;
  assignees: User[];
};
