import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const currentUser = await window.electronAPI.getCurrentUser();
    if (currentUser.success) {
      throw redirect({ to: '/dashboard' });
    } else {
      throw redirect({ to: '/login', replace: true });
    }
  },
});
