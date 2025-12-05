import checkSuperAdminHandler from './check-super-admin';
import createSuperAdminHandler from './create-super-admin';
import createUserHandler from './create-user';
import getCurrentUserHandler from './get-current-user';
import listUsersHandler from './list-users';

function registerApiHandlers() {
  createUserHandler();
  listUsersHandler();
  checkSuperAdminHandler();
  createSuperAdminHandler();
  getCurrentUserHandler();
}

export default registerApiHandlers;
