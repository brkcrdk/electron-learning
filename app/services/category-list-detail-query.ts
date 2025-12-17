import { queryOptions } from '@tanstack/react-query';

import queryKeys from './query-keys';

const categoryListDetailQuery = queryOptions({
  queryKey: [queryKeys.categoryListDetailQuery],
  queryFn: async () => {
    const response = await window.electronAPI.getCategoryList();
    if (!response.success) {
      throw response.error;
    }
    return response.data;
  },
});

export default categoryListDetailQuery;
