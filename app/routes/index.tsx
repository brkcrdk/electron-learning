import { createFileRoute } from '@tanstack/react-router';

import Button from '@app/components/ui/button';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  async function testApi() {
    const response = await window.electronAPI.getCurrentUser();
    console.log(response);
  }

  return (
    <div className="flex size-full h-svh items-center justify-center">
      <Button onClick={testApi}>Test it</Button>
    </div>
  );
}
