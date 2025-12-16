import createUser from './create-user';
import currentUser from './current-user';
import deleteUser from './delete-user';
import getPaginatedUserList from './get-paginated-user-list';
import getUserList from './get-user-list';
import updateUser from './update-user';

function userApi() {
  createUser();
  getUserList();
  updateUser();
  deleteUser();
  currentUser();
  getPaginatedUserList();
}

export default userApi;
