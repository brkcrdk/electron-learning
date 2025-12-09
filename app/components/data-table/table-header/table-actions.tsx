import { Fragment } from 'react';
import type { ReactNode } from 'react';

export type TableActionsProps = { actionId: string; actionElement: ReactNode };

interface Props {
  actions: TableActionsProps[];
}

function TableActions({ actions }: Props) {
  return (
    <div className="flex items-center gap-2">
      {actions.map(action => {
        return <Fragment key={action.actionId}>{action.actionElement}</Fragment>;
      })}
    </div>
  );
}

export default TableActions;
