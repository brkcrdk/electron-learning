import { createHashHistory, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const hashHistory = createHashHistory();

export const router = createRouter({
  defaultPendingMinMs: 0,
  routeTree,
  history: hashHistory,
});
