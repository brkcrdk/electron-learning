import createEducation from './create-education';
import deleteEducation from './delete-education';
import getEducationList from './get-education-list';
import getUsersEducation from './get-users-education';
import updateEducation from './update-education';

function educationsApi() {
  createEducation();
  getEducationList();
  updateEducation();
  deleteEducation();
  getUsersEducation();
}

export default educationsApi;
