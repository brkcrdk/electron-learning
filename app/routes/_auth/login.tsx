import { createFileRoute } from '@tanstack/react-router';

import AuthLayout from './modules/auth-layout';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthLayout actionMode="login">xx</AuthLayout>;
}
