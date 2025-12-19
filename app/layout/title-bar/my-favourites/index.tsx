import { Link } from '@tanstack/react-router';

import Icon from '@app/components/ui/icon';

function MyFavourites() {
  return (
    <Link to="/my-favourites">
      <Icon name="heart" />
    </Link>
  );
}

export default MyFavourites;
