import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import MyEducationsHeader from './modules/my-educations-header';

export const Route = createFileRoute('/_main/my-educations/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['users-education'],
    queryFn: async () => {
      const response = await window.electronAPI.getUsersEducation();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

  return (
    <div>
      <MyEducationsHeader />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
