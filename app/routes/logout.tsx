import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/logout')({
  beforeLoad: async () => {
    await window.electronAPI.logout();
    throw redirect({ to: '/login' });
  },
});
