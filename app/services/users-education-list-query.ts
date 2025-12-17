import { queryOptions } from '@tanstack/react-query';

import queryKeys from './query-keys';

const usersEducationListQuery = queryOptions({
  queryKey: [queryKeys.userEducationListQuery],
  queryFn: async () => {
    const response = await window.electronAPI.getUsersEducation();
    if (!response.success) {
      throw response.error;
    }
    return response.data;
  },
});

export default usersEducationListQuery;
