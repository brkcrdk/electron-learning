import { queryOptions } from '@tanstack/react-query';
import type { PaginationParams } from 'types/api-response-types';

import queryKeys from './query-keys';

const educationAssignmentsQuery = ({ page, limit }: PaginationParams) =>
  queryOptions({
    queryKey: [queryKeys.educationAssignmentListQuery, page, limit],
    queryFn: async () => {
      const response = await window.electronAPI.getEducationAssignmentList({ page, limit });
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

export default educationAssignmentsQuery;
