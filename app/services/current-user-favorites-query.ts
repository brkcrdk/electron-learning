import { queryOptions } from '@tanstack/react-query';

import queryKeys from './query-keys';

const currentUserFavoritesQuery = queryOptions({
  queryKey: [queryKeys.currentUserFavoritesQuery],
  queryFn: async () => {
    const response = await window.electronAPI.getCurrentUserFavorites();
    if (!response.success) {
      throw response.error;
    }
    return response.data;
  },
});

export default currentUserFavoritesQuery;
