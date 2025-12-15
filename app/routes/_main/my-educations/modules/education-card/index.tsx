import Badge from '@app/components/ui/badge';
import Button from '@app/components/ui/button';
import Card from '@app/components/ui/card';
import ImageFallback from '@app/components/ui/image-fallback';
import getContentPath from '@app/utils/get-content-path';
import type { EducationListItem } from '@db/schema';

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
        <Card.Title>{education.name}</Card.Title>
        <Card.Description>{education.description}</Card.Description>
        <Button>İçeriği Görüntüle</Button>
      </Card.Content>
    </Card>
  );
}

export default EducationCard;
