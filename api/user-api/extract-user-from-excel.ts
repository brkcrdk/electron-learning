import { inArray } from 'drizzle-orm';
import { ipcMain } from 'electron/main';
import * as XLSX from 'xlsx';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { users } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';

interface ExcelUserRow {
  'Ad Soyad'?: string;
  'Kullanıcı Adı'?: string;
  Adı?: string; // Alternatif kolon adı
  Username?: string; // Alternatif kolon adı
}

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
      const rows = XLSX.utils.sheet_to_json<ExcelUserRow>(worksheet, {
        raw: false,
        defval: '',
      });

      if (rows.length === 0) {
        return {
          success: false,
          error: 'Excel dosyası boş veya geçersiz format.',
        };
      }

      // İlk satırı header olarak kabul et ve kolon adlarını normalize et
      const firstRow = rows[0];
      const nameColumnKey = Object.keys(firstRow).find(key => key.toLowerCase().trim() === 'ad soyad' || key.toLowerCase().trim() === 'adı');
      const usernameColumnKey = Object.keys(firstRow).find(key => key.toLowerCase().trim() === 'kullanıcı adı' || key.toLowerCase().trim() === 'username');

      if (!nameColumnKey || !usernameColumnKey) {
        return {
          success: false,
          error: 'Excel dosyasında "Ad Soyad" ve "Kullanıcı Adı" kolonları bulunamadı.',
        };
      }

      // Excel'den kullanıcı bilgilerini çıkar ve normalize et
      const excelUsers: Array<{ username: string }> = [];

      rows.forEach((row: ExcelUserRow) => {
        const username = String(row[usernameColumnKey as keyof ExcelUserRow] || '').trim();

        // Boş satırları ve username'i olmayan satırları atla
        if (!username) {
          return;
        }

        excelUsers.push({
          username: username.toLowerCase(), // Username'i lowercase yap (case-insensitive eşleştirme için)
        });
      });

      if (excelUsers.length === 0) {
        return {
          success: false,
          error: 'Excel dosyasında geçerli kullanıcı bulunamadı.',
        };
      }

      // Tüm username'leri topla
      const usernames = excelUsers.map(u => u.username);

      // Veritabanında bu username'lere sahip kullanıcıları bul
      const matchedUsers = await db
        .select({
          id: users.id,
        })
        .from(users)
        .where(inArray(users.username, usernames));

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
