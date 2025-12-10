import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/categories/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['category-list'],
    queryFn: async () => {
      const response = await window.electronAPI.getCategoryList();
      if (!response.success) {
        throw response;
      }
      return response.data;
    },
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
