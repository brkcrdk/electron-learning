import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/file-manager/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['file-list'],
    queryFn: async () => {
      const response = await window.electronAPI.getFileList();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

  return (
    <div>
      Hello "/_main/file-manager/"!
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
