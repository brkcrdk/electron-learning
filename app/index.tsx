import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { toast, Toaster } from 'sonner';

import { router } from './router';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: error => {
      toast.error(error.message, {
        dismissible: false,
      });
    },
  }),
  queryCache: new QueryCache({
    onError: error => {
      toast.error(error.message, {
        dismissible: false,
      });
    },
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-left" />
      <RouterProvider router={router} />
      {import.meta.env.DEV && (
        <>
          <TanStackRouterDevtools router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      )}
    </QueryClientProvider>
  );
}

export default App;
