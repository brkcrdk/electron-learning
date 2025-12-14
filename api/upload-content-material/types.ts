export type FileUploadTypes = 'video' | 'stories' | 'pdfs' | 'images';

export interface UploadContentMaterialPayload {
  uploadId: string;
  fileName: string;
  fileSize: number;
  fileType: FileUploadTypes;
  totalChunks: number;
  chunkIndex: number;
  chunkData: ArrayBuffer;
}
