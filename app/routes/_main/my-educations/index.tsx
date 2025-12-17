import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import usersEducationListQuery from '@app/services/users-education-list-query';

import EducationCard from './modules/education-card';
import EducationsEmptyState from './modules/educations-empty-state';
import MyEducationsHeader from './modules/my-educations-header';

export const Route = createFileRoute('/_main/my-educations/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery(usersEducationListQuery);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) return null;

  return (
    <section className="h-calc(100svh-16rem) flex flex-col gap-6 overflow-auto">
      <MyEducationsHeader />
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map(education => (
            <EducationCard
              key={education.id}
              education={education}
            />
          ))}
        </div>
      ) : (
        <EducationsEmptyState />
      )}
    </section>
  );
}
