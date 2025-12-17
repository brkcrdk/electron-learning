import { queryOptions } from '@tanstack/react-query';
import type { PaginationParams } from 'types/api-response-types';

import queryKeys from './query-keys';

const assignmentUserListQuery = (searchParams: PaginationParams) =>
  queryOptions({
    queryKey: [queryKeys.assignmentUserListQuery, { ...searchParams }],
    queryFn: async () => {
      const response = await window.electronAPI.getPaginatedUserList(searchParams);
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

export default assignmentUserListQuery;
