import { inArray } from 'drizzle-orm';
import { ipcMain } from 'electron/main';
import * as XLSX from 'xlsx';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { users, type MutateUserPayload } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { hashPassword } from '../utils/password-manager';

function bulkCreateUsersFromExcel() {
  ipcMain.handle('bulk-create-users-from-excel', async (_, fileBuffer: ArrayBuffer): ApiResponseProps<string> => {
    try {
      const db = getDb();
      const currentUser = getCurrentUser();

      if (!currentUser) {
        return {
          success: false,
          error: 'Giriş yapmış kullanıcı bulunamadı.',
        };
      }

      if (currentUser.role === 'user') {
        return {
          success: false,
          error: 'Bu işlemi yapmak için yetkiniz yok.',
        };
      }

      const workbook = XLSX.read(fileBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];

      if (!firstSheetName) {
        return {
          success: false,
          error: 'Excel dosyasında sayfa bulunamadı.',
        };
      }

      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
        raw: false,
        defval: '',
      });

      if (rows.length === 0) {
        return {
          success: false,
          error: 'Excel dosyası boş veya geçersiz format.',
        };
      }

      const firstRow = rows[0];
      const allKeys = Object.keys(firstRow);

      const usernameKey = allKeys.find(key => key.toLowerCase().trim() === 'username');
      const nameKey = allKeys.find(key => key.toLowerCase().trim() === 'name');
      const roleKey = allKeys.find(key => key.toLowerCase().trim() === 'role');
      const passwordKey = allKeys.find(key => key.toLowerCase().trim() === 'password');
      const statusKey = allKeys.find(key => key.toLowerCase().trim() === 'status');

      if (!usernameKey || !nameKey || !roleKey || !passwordKey || !statusKey) {
        return {
          success: false,
          error:
            'Excel dosyasında zorunlu kolonlar bulunamadı. Gerekli kolonlar: username, name, role, password, status. Mevcut kolonlar: ' + allKeys.join(', '),
        };
      }

      const payloads: MutateUserPayload[] = [];
      const usernames: string[] = [];

      rows.forEach(row => {
        const username = String(row[usernameKey] ?? '').trim();
        const name = String(row[nameKey] ?? '').trim();
        const role = String(row[roleKey] ?? '').trim() as MutateUserPayload['role'];
        const password = String(row[passwordKey] ?? '').trim();
        const status = String(row[statusKey] ?? '').trim() as MutateUserPayload['status'];

        if (!username || !name || !role || !password || !status) {
          return;
        }

        if (!['super-admin', 'admin', 'user'].includes(role)) {
          return;
        }

        if (!['active', 'passive'].includes(status)) {
          return;
        }

        usernames.push(username);

        payloads.push({
          username,
          name,
          role,
          password,
          status,
        } as MutateUserPayload);
      });

      if (payloads.length === 0) {
        return {
          success: false,
          error: 'Excel dosyasında geçerli kullanıcı satırı bulunamadı.',
        };
      }

      const existingUsers = await db.select({ username: users.username }).from(users).where(inArray(users.username, usernames));

      const existingUsernameSet = new Set(existingUsers.map(u => u.username));

      const finalPayloads: MutateUserPayload[] = [];

      for (const payload of payloads) {
        if (existingUsernameSet.has(payload.username!)) {
          continue;
        }

        const hashedPassword = await hashPassword(payload.password!);

        finalPayloads.push({
          ...payload,
          password: hashedPassword,
        });
      }

      if (finalPayloads.length === 0) {
        return {
          success: false,
          error: 'Tüm satırlar hata veya çakışma nedeniyle atlandı.',
        };
      }

      await db.insert(users).values(finalPayloads);

      return {
        success: true,
        data: 'Kullanıcılar başarıyla işlendi.',
      };
    } catch (error) {
      console.error('bulk-create-users-from-excel error:', error);
      return {
        success: false,
        error: error instanceof Error ? `Excel dosyası işlenirken bir hata oluştu: ${error.message}` : 'Excel dosyası işlenirken beklenmeyen bir hata oluştu.',
      };
    }
  });
}

export default bulkCreateUsersFromExcel;
