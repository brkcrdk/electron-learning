import { useQuery } from '@tanstack/react-query';

function useCurrentUserQuery() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await window.electronAPI.getCurrentUser();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });
}

export default useCurrentUserQuery;
