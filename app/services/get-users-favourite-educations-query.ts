import { queryOptions } from '@tanstack/react-query';
import type { PaginationParams } from 'types/api-response-types';

import queryKeys from './query-keys';

interface Props extends PaginationParams {
  userId: number;
}

function getUsersFavouriteEducationsQuery({ userId, ...params }: Props) {
  return queryOptions({
    queryKey: [queryKeys.usersFavouriteEducationsListQuery, userId, { ...params }],
    queryFn: async () => {
      const response = await window.electronAPI.getUsersFavouriteEducationsList(userId, params);
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });
}

export default getUsersFavouriteEducationsQuery;
