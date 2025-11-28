import { createFileRoute } from '@tanstack/react-router';

import { router } from '../router';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const response = await window.electronAPI.checkSuperAdmin();

    if (!response.success) {
      router.navigate({ to: '/signup' });
    } else {
      router.navigate({ to: '/login' });
    }
  },
});
