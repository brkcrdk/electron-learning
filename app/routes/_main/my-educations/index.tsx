import { createFileRoute } from '@tanstack/react-router';

import MyEducationsHeader from './modules/my-educations-header';

export const Route = createFileRoute('/_main/my-educations/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MyEducationsHeader />
    </div>
  );
}
