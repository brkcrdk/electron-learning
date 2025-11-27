import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/welcome')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/welcome"!
      <Link to="/logout">Logout</Link>
    </div>
  );
}
