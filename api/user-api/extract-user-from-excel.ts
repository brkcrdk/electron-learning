import { inArray } from 'drizzle-orm';
import { ipcMain } from 'electron/main';
import * as XLSX from 'xlsx';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { users } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';

function extractUserFromExcel() {
  ipcMain.handle('extract-user-from-excel', async (_, fileBuffer: ArrayBuffer): ApiResponseProps<number[]> => {
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

      // Excel dosyasını parse et
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

      // İlk satırı header olarak kabul et ve kolon adlarını bul
      const firstRow = rows[0];
      const allKeys = Object.keys(firstRow);

      // Kolon adlarını bul (sadece "username" ve "name" kolonlarına odaklan)
      const usernameColumnKey = allKeys.find(key => key.toLowerCase().trim() === 'username');
      const nameColumnKey = allKeys.find(key => key.toLowerCase().trim() === 'name');

      // En az bir kolon bulunmalı
      if (!usernameColumnKey && !nameColumnKey) {
        return {
          success: false,
          error: `Excel dosyasında "username" veya "name" kolonu bulunamadı. Mevcut kolonlar: ${allKeys.join(', ')}`,
        };
      }

      // Excel'den kullanıcı bilgilerini çıkar ve normalize et
      const excelUsers: Array<{ username?: string; name?: string }> = [];

      rows.forEach((row: Record<string, unknown>) => {
        const username = usernameColumnKey ? String(row[usernameColumnKey] || '').trim() : '';
        const name = nameColumnKey ? String(row[nameColumnKey] || '').trim() : '';

        // Boş satırları atla (en az bir değer olmalı)
        if (!username && !name) {
          return;
        }

        excelUsers.push({
          username: username ? username.toLowerCase() : undefined,
          name: name ? name.toLowerCase() : undefined,
        });
      });

      if (excelUsers.length === 0) {
        return {
          success: false,
          error: 'Excel dosyasında geçerli kullanıcı bulunamadı.',
        };
      }

      // Veritabanında eşleşen kullanıcıları bul
      let matchedUsers: Array<{ id: number }> = [];

      if (usernameColumnKey) {
        // Username ile eşleştirme (öncelikli)
        const usernames = excelUsers.filter(u => u.username).map(u => u.username!);
        if (usernames.length > 0) {
          matchedUsers = await db
            .select({
              id: users.id,
            })
            .from(users)
            .where(inArray(users.username, usernames));
        }
      }

      if (nameColumnKey && (!usernameColumnKey || matchedUsers.length === 0)) {
        // Name ile eşleştirme (username yoksa veya username ile eşleşme bulunamadıysa)
        const names = excelUsers.filter(u => u.name).map(u => u.name!);
        if (names.length > 0) {
          const nameMatchedUsers = await db
            .select({
              id: users.id,
            })
            .from(users)
            .where(inArray(users.name, names));

          // Eğer username ile eşleşme varsa birleştir, yoksa sadece name sonuçlarını kullan
          if (matchedUsers.length > 0) {
            const existingIds = new Set(matchedUsers.map(u => u.id));
            matchedUsers = [...matchedUsers, ...nameMatchedUsers.filter(u => !existingIds.has(u.id))];
          } else {
            matchedUsers = nameMatchedUsers;
          }
        }
      }

      // Eşleşen kullanıcıların ID'lerini al
      const userIds = matchedUsers.map(u => u.id);

      return {
        success: true,
        data: userIds,
      };
    } catch (error) {
      console.error('extract-user-from-excel error:', error);
      return {
        success: false,
        error: error instanceof Error ? `Excel dosyası işlenirken bir hata oluştu: ${error.message}` : 'Excel dosyası işlenirken beklenmeyen bir hata oluştu.',
      };
    }
  });
}

export default extractUserFromExcel;
