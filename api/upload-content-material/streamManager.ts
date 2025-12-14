import type { WriteStream } from 'fs';

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
 * Hata durumunda stream'i temizler
 */
export function cleanupStream(uploadId: string): void {
  const stream = uploadStreams.get(uploadId);
  if (stream) {
    stream.destroy();
    deleteStream(uploadId);
  }
}
