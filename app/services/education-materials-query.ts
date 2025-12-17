import { queryOptions } from '@tanstack/react-query';

import queryKeys from './query-keys';

const educationMaterialsQuery = queryOptions({
  queryKey: [queryKeys.educationMaterialListQuery],
  queryFn: async () => {
    const response = await window.electronAPI.getEducationMaterialList();
    if (!response.success) {
      throw response.error;
    }
    return response.data;
  },
});

export default educationMaterialsQuery;
