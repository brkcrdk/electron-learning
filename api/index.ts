import categoryApi from './category-api';
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
}

export default registerApiHandlers;
