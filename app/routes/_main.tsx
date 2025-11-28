import { createFileRoute, Outlet } from '@tanstack/react-router';

import Layout from '../layout';

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
  beforeLoad: async () => {
    console.log('beforeLoad');
    // TODO: Kullanıcı giriş yapmış mı kontrol et, giriş yapmamışsa /login sayfasına yönlendir.
  },
});

function RouteComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
