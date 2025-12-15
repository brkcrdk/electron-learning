import Badge from '@app/components/ui/badge';
import Button from '@app/components/ui/button';
import Card from '@app/components/ui/card';
import Icon from '@app/components/ui/icon';
import type { IconListProps } from '@app/components/ui/icon/icon-list';
import ImageFallback from '@app/components/ui/image-fallback';
import Tooltip from '@app/components/ui/tooltip';
import getContentPath from '@app/utils/get-content-path';
import type { EducationListItem, MediaFileTypes } from '@db/schema';

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
  return (
    <Card className="hover:bg-accent/30 gap-0 p-0 transition-shadow hover:shadow-md">
      <Card.Header className="relative p-2">
        <ImageFallback
          className="aspect-video size-full rounded-sm"
          src={getContentPath(education.coverImage?.filePath)}
        />
        <Badge className="absolute right-4 top-4">{education.category.name}</Badge>
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
        <Button>Eğitimi Görüntüle</Button>
      </Card.Content>
    </Card>
  );
}

export default EducationCard;
