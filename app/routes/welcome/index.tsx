import { createFileRoute } from '@tanstack/react-router';

import WelcomeHeader from './modules/welcom-header';
import WelcomeForm from './modules/welcome-form';

export const Route = createFileRoute('/welcome/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="bg-base-200 flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body space-y-6">
          <WelcomeHeader />

          <WelcomeForm />
        </div>
      </div>
    </section>
  );
}
