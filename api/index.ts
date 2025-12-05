import checkSuperAdminHandler from './check-super-admin';
import createSuperAdminHandler from './create-super-admin';
import createUserHandler from './create-user';
import getCurrentUserHandler from './get-current-user';
import listUsersHandler from './list-users';
import loginHandler from './login';

function registerApiHandlers() {
  createUserHandler();
  listUsersHandler();
  checkSuperAdminHandler();
  createSuperAdminHandler();
  getCurrentUserHandler();
  loginHandler();
}

export default registerApiHandlers;
