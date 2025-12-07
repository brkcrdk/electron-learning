import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/users/')({
  component: RouteComponent,
});

function RouteComponent() {
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['user-list'],
  //   queryFn: () => window.electronAPI.getUserList(),
  // });
  return <div>Hello "/_main/user-list/"!</div>;
}
