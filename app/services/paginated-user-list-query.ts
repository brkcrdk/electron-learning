import { queryOptions } from '@tanstack/react-query';
import type { PaginationParams } from 'types/api-response-types';

import queryKeys from './query-keys';

const paginatedUserListQuery = (params: PaginationParams) =>
  queryOptions({
    queryKey: [queryKeys.paginatedUserListQuery, { ...params }],
    queryFn: async () => {
      const response = await window.electronAPI.getPaginatedUserList(params);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });

export default paginatedUserListQuery;
