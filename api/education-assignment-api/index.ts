import createAssigment from './create-assigment';
import getAssigmentAssignees from './get-assigment-assignees';
import getAssigmentList from './get-assigment-list';

function educationAssignmentApi() {
  createAssigment();
  getAssigmentList();
  getAssigmentAssignees();
}

export default educationAssignmentApi;
