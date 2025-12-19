import addToFavorites from './add-to-favorites';
import getCurrentUserFavorites from './get-current-user-favorites';
import removeFromFavorites from './remove-from-favorites';

function userFavoritesApi() {
  addToFavorites();
  removeFromFavorites();
  getCurrentUserFavorites();
}

export default userFavoritesApi;
