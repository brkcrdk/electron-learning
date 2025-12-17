import { queryOptions } from '@tanstack/react-query';

const currentUserQuery = queryOptions({
  queryKey: ['current-user'],
  queryFn: async () => {
    const response = await window.electronAPI.getCurrentUser();
    if (!response.success) {
      throw response.error;
    }
    return response.data;
  },
});

export default currentUserQuery;
