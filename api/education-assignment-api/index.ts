import createAssignment from './create-assignment';
import deleteAssignment from './delete-assignment';
import getAssignmentAssignees from './get-assignment-assignees';
import getAssignmentList from './get-assignment-list';
import updateAssignment from './update-assignment';

function educationAssignmentApi() {
  createAssignment();
  deleteAssignment();
  getAssignmentList();
  getAssignmentAssignees();
  updateAssignment();
}

export default educationAssignmentApi;
