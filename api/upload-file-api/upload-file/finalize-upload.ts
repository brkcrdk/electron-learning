import type { WriteStream } from 'fs';

import type { MediaFileTypes } from '@db/schema';

import type { ApiResponseProps } from '../../../types/api-response-types';
import type { FileUploadResponse } from '../types';

interface Props {
  writeStream: WriteStream;
  filePath: string;
  fileName: string;
  fileSize: number;
  mediaType: MediaFileTypes;
}

/**
 * Temel finalize işlemi - Stream'i kapatır ve response döndürür
 * Tek chunk durumları için kullanılır
 */
function finalizeUpload({ writeStream, filePath, fileName, fileSize, mediaType }: Props): ApiResponseProps<FileUploadResponse> {
  return new Promise((resolve, reject) => {
    // Error handler'ı önce ekle (race condition önlemek için)
    writeStream.on('error', error => {
      reject(error);
    });

    writeStream.end(() => {
      console.log('File saved to:', filePath);
      resolve({
        success: true,
        data: {
          id: 0,
          mediaType,
          fileName,
          fileFullUrl: filePath,
          fileSize,
        },
      });
    });
  });
}

export default finalizeUpload;
