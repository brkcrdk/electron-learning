import { useQuery } from '@tanstack/react-query';

function useCurrentUserQuery() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => window.electronAPI.getCurrentUser(),
  });
}

export default useCurrentUserQuery;
