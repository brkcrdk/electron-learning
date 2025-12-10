import { useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import type { RowSelectionState } from '@tanstack/react-table';

import DataTable from '@app/components/data-table';

export const Route = createFileRoute('/_main/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'hello from dashboard';
}
