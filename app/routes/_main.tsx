import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
  beforeLoad: async () => {
    console.log('beforeLoad');
    // TODO: Kullanıcı giriş yapmış mı kontrol et, giriş yapmamışsa /login sayfasına yönlendir.
  },
});

function RouteComponent() {
  return (
    <div className="bg-accent-content p-4">
      <h1 className="mb-4 text-2xl font-bold">Main Layout</h1>
      <Outlet />
    </div>
  );
}
