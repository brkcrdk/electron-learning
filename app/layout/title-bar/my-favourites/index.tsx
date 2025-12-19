import { Link } from '@tanstack/react-router';

import Icon from '@app/components/ui/icon';
import Tooltip from '@app/components/ui/tooltip';

function MyFavourites() {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Link to="/my-favourites">
          <Icon name="heart" />
        </Link>
      </Tooltip.Trigger>
      <Tooltip.Content>Favorilerim</Tooltip.Content>
    </Tooltip>
  );
}

export default MyFavourites;
