import { useQuery } from '@tanstack/react-query';

import Tabs from '@app/components/ui/tabs';
import getUsersFavouriteEducationsQuery from '@app/services/get-users-favourite-educations-query';

interface Props {
  userId: number;
}
function UsersFavouriteEducations({ userId }: Props) {
  const { data, isLoading } = useQuery(getUsersFavouriteEducationsQuery(userId));

  return (
    <Tabs.Content value="user-favorite-educations">
      <ul>
        <pre>{JSON.stringify(isLoading, null, 4)}</pre>
        {/* {data?.map(education => (
          <EducationListItem key={education.id} education={education} />
        ))} */}
      </ul>
    </Tabs.Content>
  );
}

export default UsersFavouriteEducations;
