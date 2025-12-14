import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, index, foreignKey } from 'drizzle-orm/sqlite-core';

import { mediaFiles, type MediaFile, mediaTypeEnum } from './media-files';
import { users, type User } from './users';

export const educations = sqliteTable(
  'educations',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description').notNull(),
    contentType: text('content_type', { enum: mediaTypeEnum }).notNull(),
    coverImageId: integer('cover_image_id').notNull(),
    contentFileId: integer('content_file_id').notNull(),
    createdBy: integer('created_by').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  table => [
    index('idx_educations_cover_image_id').on(table.coverImageId),
    index('idx_educations_content_file_id').on(table.contentFileId),
    index('idx_educations_created_by').on(table.createdBy),
    index('idx_educations_content_type').on(table.contentType),
    foreignKey({
      columns: [table.coverImageId],
      foreignColumns: [mediaFiles.id],
    }),
    foreignKey({
      columns: [table.contentFileId],
      foreignColumns: [mediaFiles.id],
    }),
    foreignKey({
      columns: [table.createdBy],
      foreignColumns: [users.id],
    }),
  ]
);

export type Educations = typeof educations.$inferSelect;
export type NewEducationsPayload = typeof educations.$inferInsert;
export type CreateEducationPayload = Omit<NewEducationsPayload, 'createdBy' | 'createdAt' | 'updatedAt'>;
export type EducationListItem = Omit<Educations, 'coverImageId' | 'contentFileId' | 'createdBy'> & {
  coverImage: MediaFile;
  contentFile: MediaFile;
  createdBy: User;
};
