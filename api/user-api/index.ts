import createUser from './create-user';
import currentUser from './current-user';
import deleteUser from './delete-user';
import getUserList from './get-user-list';
import updateUser from './update-user';

function userApi() {
  createUser();
  getUserList();
  updateUser();
  deleteUser();
  currentUser();
}

export default userApi;
