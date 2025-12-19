import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import Badge from '@app/components/ui/badge';
import Button from '@app/components/ui/button';
import Card from '@app/components/ui/card';
import Icon from '@app/components/ui/icon';
import type { IconListProps } from '@app/components/ui/icon/icon-list';
import ImageFallback from '@app/components/ui/image-fallback';
import Tooltip from '@app/components/ui/tooltip';
import currentUserFavoritesQuery from '@app/services/current-user-favorites-query';
import queryKeys from '@app/services/query-keys';
import getContentPath from '@app/utils/get-content-path';
import type { EducationListItem, MediaFileTypes } from '@db/schema';

import ViewEducation from './view-education';

interface ContentTypeOption {
  label: string;
  icon: IconListProps;
}

const contentTypeLabels: Record<MediaFileTypes, ContentTypeOption> = {
  pdfs: {
    label: 'PDF İçeriği',
    icon: 'file-pdf',
  },
  video: {
    label: 'Video İçeriği',
    icon: 'file-video',
  },
  stories: {
    label: 'Articulate İçeriği',
    icon: 'file-easel',
  },
  images: {
    label: 'Resim İçeriği',
    icon: 'file-image',
  },
};

interface Props {
  education: EducationListItem;
}

function EducationCard({ education }: Props) {
  const queryClient = useQueryClient();

  const { data: favorites } = useQuery(currentUserFavoritesQuery);
  const isFavorite = favorites?.some(fav => fav.education.id === education.id) ?? false;

  const { mutateAsync: addToFavorites, isPending: isAdding } = useMutation({
    mutationFn: () => window.electronAPI.addToFavorites(education.id),
    onSuccess: response => {
      if (response.success) {
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
    <Card className="hover:bg-accent/30 gap-0 p-0 transition-shadow hover:shadow-md">
      <Card.Header className="relative p-2">
        <ImageFallback
          className="aspect-video size-full rounded-sm object-cover"
          src={getContentPath(education.coverImage?.filePath)}
        />
        <Badge className="absolute right-4 top-4">{education.category.name}</Badge>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button
              className="absolute left-4 top-4"
              onClick={handleFavoriteToggle}
              disabled={isAdding || isRemoving}
              size="icon"
              variant="secondary"
            >
              <Icon
                name="book"
                className={isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}
              />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p>{isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}</p>
          </Tooltip.Content>
        </Tooltip>
      </Card.Header>
      <Card.Content className="grid gap-4 p-4">
        <div className="flex items-center gap-2">
          <Card.Title>{education.name}</Card.Title>
          <Tooltip>
            <Tooltip.Trigger>
              <Icon
                name={contentTypeLabels[education.educationMaterial.contentType].icon}
                className="size-4"
              />
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>{contentTypeLabels[education.educationMaterial.contentType].label}</p>
            </Tooltip.Content>
          </Tooltip>
        </div>
        <Card.Description>{education.description}</Card.Description>
        <ViewEducation educationMaterial={education.educationMaterial} />
      </Card.Content>
    </Card>
  );
}

export default EducationCard;
