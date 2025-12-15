import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, index, foreignKey } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const mediaTypeEnum = ['video', 'stories', 'pdfs', 'images'] as const;

export const mediaFiles = sqliteTable(
  'media_files',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    filePath: text('file_path').notNull(), // Relative dosya yolu
    fileName: text('file_name').notNull(), // Orijinal dosya adı
    fileSize: integer('file_size').notNull(), // Byte cinsinden boyut
    mediaType: text('media_type', { enum: mediaTypeEnum }).notNull(),
    uploadedBy: integer('uploaded_by'), // user_id - foreign key
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  table => [
    index('idx_files_uploaded_by').on(table.uploadedBy),
    index('idx_files_media_type').on(table.mediaType),
    foreignKey({
      columns: [table.uploadedBy],
      foreignColumns: [users.id], // users tablosundan import edilmeli
    }),
  ]
);

export type MediaFile = typeof mediaFiles.$inferSelect;
export type MutateMediaFilePayload = typeof mediaFiles.$inferInsert;
export type MediaFileTypes = MediaFile['mediaType'];
