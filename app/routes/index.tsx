import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const currentUser = await window.electronAPI.getCurrentUser();

    if (currentUser.success) {
      throw redirect({ to: '/dashboard' });
    } else {
      const response = await window.electronAPI.checkSuperAdminExists();
      if (!response.success) {
        throw redirect({ to: '/signup' });
      }
      throw redirect({ to: '/login' });
    }
  },
});
