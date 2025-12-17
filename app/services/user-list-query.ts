import { queryOptions } from '@tanstack/react-query';

import queryKeys from './query-keys';

const userListQuery = queryOptions({
  queryKey: [queryKeys.userListQuery],
  queryFn: async () => {
    const response = await window.electronAPI.getUserList();
    if (!response.success) {
      throw response.error;
    }
    return response.data;
  },
});

export default userListQuery;
