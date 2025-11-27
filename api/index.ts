import checkSuperAdminHandler from './check-super-admin';
import createUserHandler from './create-user';
import listUsersHandler from './list-users';

export function registerApiHandlers() {
  createUserHandler();
  listUsersHandler();
  checkSuperAdminHandler();
}
