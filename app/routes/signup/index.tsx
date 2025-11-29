import { createFileRoute } from '@tanstack/react-router';

import SignupForm from './modules/signup-form';
import SignupHeader from './modules/signup-header';

export const Route = createFileRoute('/signup/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="bg-base-200 flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-lg shadow-xl">
        <div className="card-body space-y-6">
          <SignupHeader />

          <SignupForm />
          <button
            onClick={async () => {
              const theme = await window.store.setTheme('dark');
              console.log(theme);
            }}
          >
            xx
          </button>
          {/* <pre>{JSON.stringify(window.store.getTheme(), null, 4)}</pre> */}
        </div>
      </div>
    </section>
  );
}
