import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import Layout from '../layout';

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
  staticData: {
    breadcrumb: 'Ana Sayfa',
  },
  beforeLoad: async () => {
    const currentUser = await window.electronAPI.getCurrentUser();
    if (!currentUser.success) {
      throw redirect({ to: '/login' });
    }
  },
});

function RouteComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
