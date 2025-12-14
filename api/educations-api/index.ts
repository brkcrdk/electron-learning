import createEducation from './create-education';
import getEducationList from './get-education-list';

function educationsApi() {
  getEducationList();
  createEducation();
}

export default educationsApi;
