import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <main className="bg-base-200 h-svh overflow-hidden">
      <Outlet />
    </main>
  );
}
