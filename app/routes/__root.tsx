import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <main className="bg-base-200">
      <div className="bg-base-300 webkit-draggable h-8" />
      <Outlet />
    </main>
  );
}
