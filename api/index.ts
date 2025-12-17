import categoryApi from './category-api';
import educationAssignmentApi from './education-assignment-api';
import educationMaterialsApi from './education-materials-api';
import educationsApi from './educations-api';
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
  educationMaterialsApi();
  educationsApi();
  educationAssignmentApi();
}

export default registerApiHandlers;
