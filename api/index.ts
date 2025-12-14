import categoryApi from './category-api';
import fileDirectoryApi from './file-directory-api';
import sessionApi from './session-api';
import superAdminApi from './super-admin-api';
import uploadFileApi from './upload-file-api';
import userApi from './user-api';

function registerApiHandlers() {
  superAdminApi();
  userApi();
  categoryApi();
  sessionApi();
  uploadFileApi();
  fileDirectoryApi();
}

export default registerApiHandlers;
