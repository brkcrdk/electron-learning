import { desc, eq } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { mediaFiles, users, type MediaFile, type User } from '@db/schema';

type UserWithoutPassword = Omit<User, 'password'>;

type FileWithUser = Omit<MediaFile, 'uploadedBy'> & { uploadedBy: UserWithoutPassword | null };

function getFileList() {
  ipcMain.handle('get-file-list', async (): ApiResponseProps<FileWithUser[]> => {
    try {
      const db = getDb();

      const currentUser = getCurrentUser();

      if (!currentUser) {
        return {
          success: false,
          error: 'Giriş yapmış kullanıcı bulunamadı.',
        };
      }

      if (currentUser.role !== 'super-admin') {
        return {
          success: false,
          error: 'Bu işlemi yapmak için yetkiniz yok.',
        };
      }

      const fileList = await db
        .select({
          id: mediaFiles.id,
          filePath: mediaFiles.filePath,
          fileName: mediaFiles.fileName,
          fileSize: mediaFiles.fileSize,
          mediaType: mediaFiles.mediaType,
          createdAt: mediaFiles.createdAt,
          updatedAt: mediaFiles.updatedAt,
          uploadedBy: {
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            status: users.status,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt,
            lastLoginAt: users.lastLoginAt,
          },
        })
        .from(mediaFiles)
        .leftJoin(users, eq(mediaFiles.uploadedBy, users.id))
        .orderBy(desc(mediaFiles.createdAt));

      return {
        success: true,
        data: fileList,
      };
    } catch (error) {
      console.error('get file list error', error);
      throw error;
    }
  });
}

export default getFileList;
