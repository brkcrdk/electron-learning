import createAssigment from './create-assigment';
import deleteAssigment from './delete-assigment';
import getAssigmentAssignees from './get-assigment-assignees';
import getAssigmentList from './get-assigment-list';

function educationAssignmentApi() {
  createAssigment();
  deleteAssigment();
  getAssigmentList();
  getAssigmentAssignees();
}

export default educationAssignmentApi;
