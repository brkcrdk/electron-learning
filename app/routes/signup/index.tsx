import { createFileRoute, Link } from '@tanstack/react-router';

import SignupForm from './modules/signup-form';
import SignupHeader from './modules/signup-header';

export const Route = createFileRoute('/signup/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="bg-base-200  webkit-draggable flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="card bg-base-100 webkit-no-draggable w-full max-w-lg shadow-xl">
        <div className="card-body space-y-6">
          <SignupHeader />
          <SignupForm />
        </div>
        <Link to="/route-c">Hesabın var mı? Giriş yap</Link>
      </div>
    </section>
  );
}
