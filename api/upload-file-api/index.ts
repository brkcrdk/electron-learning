import cleanupPayloadHandler from './cleanup-payload-handler';
import uploadFileHandler from './upload-file-handler';

function uploadFileApi() {
  uploadFileHandler();
  cleanupPayloadHandler();
}

export type { UploadFilePayload } from './types';
export default uploadFileApi;
