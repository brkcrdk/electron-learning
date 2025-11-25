import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="example@example.com"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="********"
        />

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </section>
  );
}
