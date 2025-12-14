import type { ApiResponseProps } from 'types/api-response-types';

import type { MediaFileTypes } from '@db/schema';

export interface UploadFilePayload {
  uploadId: string;
  fileName: string;
  fileSize: number;
  mediaType: MediaFileTypes;
  totalChunks: number;
  chunkIndex: number;
  chunkData: ArrayBuffer;
}

export interface FileUploadResponse {
  id: number;
  mediaType: MediaFileTypes;
  fileName: string;
  fileFullUrl: string;
  fileSize: number;
}

export type FileUploadResponseType = ApiResponseProps<string | FileUploadResponse>;
