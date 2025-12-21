import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import EducationCard from '@app/components/education-card';
import Icon from '@app/components/ui/icon';
import currentUserFavoritesQuery from '@app/services/current-user-favorites-query';

export const Route = createFileRoute('/_main/my-favourites')({
  component: RouteComponent,
  staticData: {
    breadcrumb: 'Favorilerim',
  },
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery(currentUserFavoritesQuery);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <section className="h-calc(100svh-16rem) flex flex-col gap-6 overflow-auto">
      <h1 className="text-2xl font-bold">Favorilerim</h1>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map(({ education }) => (
            <EducationCard
              key={education.id}
              education={education}
            />
          ))}
        </div>
      ) : (
        <div className="bg-base-200">
          <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
            <div className="flex max-w-md flex-col items-center justify-center">
              <Icon
                name="folder-open-outline"
                className="mb-6 size-10"
              />
              <h1 className="text-2xl font-semibold">Henüz bir favori eğitiminiz yok.</h1>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
