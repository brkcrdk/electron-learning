import type { FileUploadResponse } from '@api/upload-file-api/types';
import getContentPath from '@app/utils/get-content-path';
import type { MediaFile } from '@db/schema';

function mapCoverImageToUploadResponse(coverImage: MediaFile | null): FileUploadResponse | null {
  if (!coverImage) return null;

  return {
    id: coverImage.id,
    mediaType: coverImage.mediaType,
    fileName: coverImage.fileName,
    fileFullUrl: getContentPath(coverImage.filePath),
    fileSize: coverImage.fileSize,
  };
}

export default mapCoverImageToUploadResponse;
