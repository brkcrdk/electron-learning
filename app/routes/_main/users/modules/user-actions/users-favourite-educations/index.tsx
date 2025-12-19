import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import Icon from '@app/components/ui/icon';
import Tabs from '@app/components/ui/tabs';
import getUsersFavouriteEducationsQuery from '@app/services/get-users-favourite-educations-query';
import queryKeys from '@app/services/query-keys';

import EducationListItem from './education-list-item';

interface Props {
  userId: number;
}
function UsersFavouriteEducations({ userId }: Props) {
  // const { data, isLoading } = useQuery(getUsersFavouriteEducationsQuery({ userId }));

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: [queryKeys.usersFavouriteEducationsListQuery, userId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await window.electronAPI.getUsersFavouriteEducationsList(userId, {
        page: pageParam,
        limit: 10, // veya istediğiniz limit değeri
      });
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
    getNextPageParam: lastPage => {
      // Eğer son sayfadaysak undefined döndür (daha fazla sayfa yok)
      if (lastPage.pagination.page >= lastPage.pagination.totalPages) {
        return undefined;
      }
      // Bir sonraki sayfa numarasını döndür
      return lastPage.pagination.page + 1;
    },
    initialPageParam: 1, // İlk sayfa parametresi
  });

  if (!data) return null;

  return (
    <Tabs.Content value="user-favorite-educations">
      {data
        ? data.pages.map(page => {
            if (page.items.length === 0) {
              return (
                <span
                  key={page.pagination.page}
                  className="text-base-content/50 flex items-center justify-center py-4 pt-10"
                >
                  Bu kullanıcıya ait favori eğitim bulunmamaktadır.
                </span>
              );
            }
            return (
              <ul
                className="grid gap-2"
                key={page.pagination.page}
              >
                {page.items.map(item => (
                  <EducationListItem
                    key={item.id}
                    education={item}
                  />
                ))}
              </ul>
            );
          })
        : null}
    </Tabs.Content>
  );
}

export default UsersFavouriteEducations;
