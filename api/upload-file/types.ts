import type { ApiResponseProps } from 'types/api-response-types';

export type FileUploadTypes = 'video' | 'stories' | 'pdfs' | 'images';

export interface UploadFilePayload {
  uploadId: string;
  fileName: string;
  fileSize: number;
  fileType: FileUploadTypes;
  totalChunks: number;
  chunkIndex: number;
  chunkData: ArrayBuffer;
}

export interface FileUploadResponse {
  id: number;
  mediaType: FileUploadTypes;
  fileName: string;
  fileFullUrl: string;
  fileSize: number;
}

export type FileUploadResponseType = ApiResponseProps<string | FileUploadResponse>;
