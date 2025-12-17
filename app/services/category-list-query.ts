import { queryOptions } from '@tanstack/react-query';

import queryKeys from './query-keys';

const categoryListQuery = queryOptions({
  queryKey: [queryKeys.categoryList],
  queryFn: async () => {
    const response = await window.electronAPI.getCategoryList();
    if (!response.success) {
      throw response.error;
    }
    return response.data;
  },
});

export default categoryListQuery;
