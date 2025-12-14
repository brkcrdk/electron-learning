import checkSuperAdmin from './check-super-admin';
import createSuperAdmin from './create-super-admin';

function superAdminApi() {
  checkSuperAdmin();
  createSuperAdmin();
}

export default superAdminApi;
