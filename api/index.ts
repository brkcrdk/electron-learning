import checkSuperAdminHandler from './check-super-admin';
import createSuperAdminHandler from './create-super-admin';
import createUserHandler from './create-user';
import listUsersHandler from './list-users';

export function registerApiHandlers() {
  createUserHandler();
  listUsersHandler();
  checkSuperAdminHandler();
  createSuperAdminHandler();
}
