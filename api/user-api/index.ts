import bulkCreateUsersFromExcel from './bulk-create-users-from-excel';
import createUser from './create-user';
import currentUser from './current-user';
import deleteUser from './delete-user';
import extractUserFromExcel from './extract-user-from-excel';
import getPaginatedUserList from './get-paginated-user-list';
import getUserList from './get-user-list';
import updateUser from './update-user';
import getUsersFavouriteEducationsList from './users-favourite-educations-list';

function userApi() {
  createUser();
  getUserList();
  updateUser();
  deleteUser();
  currentUser();
  getPaginatedUserList();
  extractUserFromExcel();
  bulkCreateUsersFromExcel();
  getUsersFavouriteEducationsList();
}

export default userApi;
