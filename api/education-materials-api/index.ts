import createMaterial from './create-material';
import deleteMaterial from './delete-material';
import getMaterialList from './get-material-list';
import updateMaterial from './update-material';

function educationMaterialsApi() {
  getMaterialList();
  createMaterial();
  updateMaterial();
  deleteMaterial();
}

export default educationMaterialsApi;
