import createCategory from './create-category';
import deleteCategory from './delete-category';
import getCategoryDetail from './get-category-detail';
import getCategoryList from './get-category-list';
import updateCategory from './update-category';

function categoryApi() {
  createCategory();
  deleteCategory();
  getCategoryList();
  updateCategory();
  getCategoryDetail();
}

export default categoryApi;
