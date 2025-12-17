import { useEffect, useState } from 'react';

import type { RowSelectionState } from '@tanstack/react-table';

import type { RowSelectionProps } from './main-table';

function useRowSelection<T>(props: RowSelectionProps<T>) {
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>(props.enableRowSelection ? props.rowSelection : {});

  useEffect(() => {
    if (props.enableRowSelection) {
      setRowSelectionState(props.rowSelection);
    }
  }, [props]);

  return {
    rowSelectionState,
    setRowSelectionState,
  };
}

export default useRowSelection;
