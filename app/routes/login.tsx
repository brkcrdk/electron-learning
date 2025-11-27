import { createFileRoute } from '@tanstack/react-router';

import PasswordInput from '../components/ui/password-input';
import { router } from '../router';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: async () => {
    const response = await window.electronAPI.checkSuperAdmin();
    console.log({ response });

    if (!response.success) {
      router.navigate({ to: '/welcome' });
    }
  },
});

function RouteComponent() {
  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Giriş Yap</legend>

        <label className="label">E-posta</label>
        <input
          type="email"
          className="input"
          placeholder="example@example.com"
        />

        <label className="label">Şifre</label>

        <PasswordInput inputProps={{ placeholder: '********' }} />

        <button className="btn btn-neutral mt-4">Giriş Yap</button>
      </fieldset>
    </section>
  );
}
