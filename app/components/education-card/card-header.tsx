import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import Badge from '@app/components/ui/badge';
import Button from '@app/components/ui/button';
import Card from '@app/components/ui/card';
import Icon from '@app/components/ui/icon';
import ImageFallback from '@app/components/ui/image-fallback';
import Tooltip from '@app/components/ui/tooltip';
import queryKeys from '@app/services/query-keys';
import getContentPath from '@app/utils/get-content-path';
import type { EducationListItem } from '@db/schema';

interface Props {
  education: EducationListItem;
}

function CardHeader({ education }: Props) {
  const queryClient = useQueryClient();

  const isFavorite = education.isFavorite;

  const { mutateAsync: addToFavorites, isPending: isAdding } = useMutation({
    mutationFn: () => window.electronAPI.addToFavorites(education.id),
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: [queryKeys.userEducationListQuery] });
        queryClient.invalidateQueries({ queryKey: [queryKeys.currentUserFavoritesQuery] });
        toast.success(response.data);
      } else {
        toast.error(response.error, { dismissible: false });
      }
    },
  });

  const { mutateAsync: removeFromFavorites, isPending: isRemoving } = useMutation({
    mutationFn: () => window.electronAPI.removeFromFavorites(education.id),
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: [queryKeys.userEducationListQuery] });
        queryClient.invalidateQueries({ queryKey: [queryKeys.currentUserFavoritesQuery] });
        toast.success(response.data);
      } else {
        toast.error(response.error, { dismissible: false });
      }
    },
  });

  function handleFavoriteToggle() {
    if (isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  }
  return (
    <Card.Header className="relative p-2">
      <ImageFallback
        className="aspect-video size-full rounded-sm object-cover"
        src={getContentPath(education.coverImage?.filePath)}
      />
      <Badge className="absolute right-4 top-4">{education.category.name}</Badge>
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button
            className="bg-accent absolute left-4 top-4"
            onClick={handleFavoriteToggle}
            disabled={isAdding || isRemoving}
            size="icon"
            variant="ghost"
          >
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              className="fill-accent-foreground"
            />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>{isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}</p>
        </Tooltip.Content>
      </Tooltip>
    </Card.Header>
  );
}

export default CardHeader;
