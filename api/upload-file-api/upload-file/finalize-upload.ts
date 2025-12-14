import type { WriteStream } from 'fs';

import type { MediaFileTypes } from '@db/schema';

interface Props {
  writeStream: WriteStream;
  filePath: string;
  fileName: string;
  fileSize: number;
  mediaType: MediaFileTypes;
}
function finalizeUpload({ writeStream, filePath, fileName, fileSize, mediaType }: Props) {
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
