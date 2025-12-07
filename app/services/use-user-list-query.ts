import { useQuery } from '@tanstack/react-query';

function useUserListQuery() {
  return useQuery({
    queryKey: ['user-list'],
    queryFn: async () => {
      const response = await window.electronAPI.getUserList();
      if (!response.success) {
        throw response;
      }
      return response.data;
    },
  });
}

export default useUserListQuery;
