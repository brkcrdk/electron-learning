import checkSuperAdminHandler from './check-super-admin';
import createSuperAdminHandler from './create-super-admin';
import createUserHandler from './create-user';
import getCurrentUserHandler from './get-current-user';
import getUserListHandler from './get-user-list';
import loginHandler from './login';
import logoutHandler from './logout';
import updateUserHandler from './update-user';

function registerApiHandlers() {
  createUserHandler();
  getUserListHandler();
  checkSuperAdminHandler();
  createSuperAdminHandler();
  getCurrentUserHandler();
  loginHandler();
  logoutHandler();
  updateUserHandler();
}

export default registerApiHandlers;
