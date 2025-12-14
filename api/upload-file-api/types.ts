import type { ApiResponseProps } from 'types/api-response-types';

import type { MediaFileType } from '@db/schema';

export interface UploadFilePayload {
  uploadId: string;
  fileName: string;
  fileSize: number;
  fileType: MediaFileType;
  totalChunks: number;
  chunkIndex: number;
  chunkData: ArrayBuffer;
}

export interface FileUploadResponse {
  id: number;
  mediaType: MediaFileType;
  fileName: string;
  fileFullUrl: string;
  fileSize: number;
}

export type FileUploadResponseType = ApiResponseProps<string | FileUploadResponse>;
