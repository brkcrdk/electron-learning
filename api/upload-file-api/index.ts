import cleanupPayload from './cleanup-payload';
import deleteFile from './delete-file';
import uploadFile from './upload-file';

function uploadFileApi() {
  uploadFile();
  cleanupPayload();
  deleteFile();
}

export type { UploadFilePayload } from './types';
export default uploadFileApi;
