import createCategoryHandler from './create-category';
import createUserHandler from './create-user';
import deleteCategoryHandler from './delete-category';
import deleteUserHandler from './delete-user';
import getCategoryListHandler from './get-category-list';
import getCurrentUserHandler from './get-current-user';
import getUserListHandler from './get-user-list';
import loginHandler from './login';
import logoutHandler from './logout';
import superAdminApi from './super-admin-api';
import updateCategoryHandler from './update-category';
import updateUserHandler from './update-user';
import uploadFileApi from './upload-file-api';

function registerApiHandlers() {
  superAdminApi();

  // User Events
  createUserHandler();
  getUserListHandler();
  updateUserHandler();
  deleteUserHandler();

  getCurrentUserHandler();

  // Auth Events
  loginHandler();
  logoutHandler();

  // Category Events
  getCategoryListHandler();
  createCategoryHandler();
  updateCategoryHandler();
  deleteCategoryHandler();

  // File Upload Events
  uploadFileApi();
}

export default registerApiHandlers;
