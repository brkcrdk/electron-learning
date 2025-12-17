import { queryOptions } from '@tanstack/react-query';

import queryKeys from './query-keys';

const educationListQuery = queryOptions({
  queryKey: [queryKeys.educationListQuery],
  queryFn: async () => {
    const response = await window.electronAPI.getEducationList();
    if (!response.success) {
      throw response.error;
    }
    return response.data;
  },
});

export default educationListQuery;
