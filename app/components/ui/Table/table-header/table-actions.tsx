import { Link } from '@tanstack/react-router';

import cn from '../../../../utils/cn';
import Dropdown from '../../dropdown';

import type { TableActionsProps } from '../table-types';
interface Props {
  actions: TableActionsProps[];
}

function TableActions({ actions }: Props) {
  return (
    <div className="flex items-center gap-2">
      {actions.map(action => {
        if (action.actionType === 'button') {
          return (
            <button
              key={action.actionId}
              {...action.actionProps}
              className={cn('btn btn-sm', action.actionProps.className)}
            />
          );
        }
        if (action.actionType === 'dropdown') {
          return (
            <Dropdown
              key={action.actionId}
              {...action.actionProps}
            />
          );
        }
        if (action.actionType === 'link') {
          return (
            <Link
              key={action.actionId}
              {...action.actionProps}
              className={cn('btn btn-sm', action.actionProps.className)}
            />
          );
        }
        if (action.actionType === 'custom') {
          return action.actionElement;
        }
      })}
    </div>
  );
}

export default TableActions;
