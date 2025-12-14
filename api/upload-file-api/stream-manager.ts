import type { WriteStream } from 'fs';

import { remove } from 'fs-extra';

interface UploadMetadata {
  filePath: string;
  totalChunks: number;
  fileName: string;
}

// Stream'leri tutmak için Map
const uploadStreams = new Map<string, WriteStream>();
const uploadMetadata = new Map<string, UploadMetadata>();

/**
 * Stream ve metadata'yı kaydeder
 */
export function setStream(uploadId: string, stream: WriteStream, metadata: UploadMetadata): void {
  uploadStreams.set(uploadId, stream);
  uploadMetadata.set(uploadId, metadata);
}

/**
 * Stream'i getirir
 */
export function getStream(uploadId: string): WriteStream | undefined {
  return uploadStreams.get(uploadId);
}

/**
 * Metadata'yı getirir
 */
export function getMetadata(uploadId: string): UploadMetadata | undefined {
  return uploadMetadata.get(uploadId);
}

/**
 * Stream ve metadata'yı siler
 */
export function deleteStream(uploadId: string): void {
  uploadStreams.delete(uploadId);
  uploadMetadata.delete(uploadId);
}

/**
 * Hata durumunda stream'i ve dosyayı temizler
 */
export async function cleanupStream(uploadId: string): Promise<void> {
  const stream = uploadStreams.get(uploadId);
  const metadata = uploadMetadata.get(uploadId);

  if (stream) {
    stream.destroy();
  }

  // Dosyayı sil
  if (metadata?.filePath) {
    try {
      await remove(metadata.filePath);
      console.log('Yarım kalmış dosya silindi:', metadata.filePath);
    } catch (error) {
      console.error('Dosya silinirken hata oluştu:', error);
      // Dosya silme hatası kritik değil, devam et
    }
  }

  // Stream ve metadata'yı temizle
  deleteStream(uploadId);
}
