import checkSuperAdminHandler from './check-super-admin';
import createCategoryHandler from './create-category';
import createSuperAdminHandler from './create-super-admin';
import createUserHandler from './create-user';
import deleteCategoryHandler from './delete-category';
import deleteUserHandler from './delete-user';
import getCategoryListHandler from './get-category-list';
import getCurrentUserHandler from './get-current-user';
import getUserListHandler from './get-user-list';
import loginHandler from './login';
import logoutHandler from './logout';
import updateCategoryHandler from './update-category';
import updateUserHandler from './update-user';
import uploadContentMaterialHandler from './upload-content-material';

function registerApiHandlers() {
  // User Events
  createUserHandler();
  getUserListHandler();
  updateUserHandler();
  deleteUserHandler();
  createSuperAdminHandler();
  getCurrentUserHandler();
  checkSuperAdminHandler();

  // Auth Events
  loginHandler();
  logoutHandler();

  // Category Events
  getCategoryListHandler();
  createCategoryHandler();
  updateCategoryHandler();
  deleteCategoryHandler();

  // Education Material Events
  uploadContentMaterialHandler();
}

export default registerApiHandlers;
