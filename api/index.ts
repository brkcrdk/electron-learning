import checkSuperAdminHandler from './check-super-admin';
import createSuperAdminHandler from './create-super-admin';
import createUserHandler from './create-user';
import getCurrentUserHandler from './get-current-user';
import listUsersHandler from './list-users';
import loginHandler from './login';
import logoutHandler from './logout';

function registerApiHandlers() {
  createUserHandler();
  listUsersHandler();
  checkSuperAdminHandler();
  createSuperAdminHandler();
  getCurrentUserHandler();
  loginHandler();
  logoutHandler();
}

export default registerApiHandlers;
