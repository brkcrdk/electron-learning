import checkSuperAdminHandler from './check-super-admin';
import createSuperAdminHandler from './create-super-admin';
import createUserHandler from './create-user';
import listUsersHandler from './list-users';

function registerApiHandlers() {
  createUserHandler();
  listUsersHandler();
  checkSuperAdminHandler();
  createSuperAdminHandler();
}

export default registerApiHandlers;
