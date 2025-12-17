import { queryOptions } from '@tanstack/react-query';

import type { EducationAssignmentListItem } from '@db/schema';

import queryKeys from './query-keys';

/**
 * Bir eğitim atamasına atanan kullanıcıların listesini döndürür. Atama listesinde
 * tüm kullanıcıları dönmek yerine atanan kullanıcıları ayrı bir query ile alıyoruz.
 */
const assignmentUserListQuery = (assignmentId: EducationAssignmentListItem['id']) =>
  queryOptions({
    queryKey: [queryKeys.assignmentUserListQuery, assignmentId],
    queryFn: async () => {
      const response = await window.electronAPI.getEducationAssignmentAssignees(assignmentId);
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

export default assignmentUserListQuery;
