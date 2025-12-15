import createEducation from './create-education';
import deleteEducation from './delete-education';
import getEducationList from './get-education-list';
import updateEducation from './update-education';

function educationsApi() {
  createEducation();
  getEducationList();
  updateEducation();
  deleteEducation();
}

export default educationsApi;
