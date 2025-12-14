import createCategory from './create-category';
import deleteCategory from './delete-category';
import getCategoryList from './get-category-list';
import updateCategory from './update-category';

function categoryApi() {
  createCategory();
  deleteCategory();
  getCategoryList();
  updateCategory();
}

export default categoryApi;
