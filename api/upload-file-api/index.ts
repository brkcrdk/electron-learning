import cleanupPayload from './cleanup-payload';
import uploadFile from './upload-file';

function uploadFileApi() {
  uploadFile();
  cleanupPayload();
}

export type { UploadFilePayload } from './types';
export default uploadFileApi;
