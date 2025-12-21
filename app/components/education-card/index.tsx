import { Link } from '@tanstack/react-router';

import Card from '@app/components/ui/card';
import Icon from '@app/components/ui/icon';
import type { IconListProps } from '@app/components/ui/icon/icon-list';
import Tooltip from '@app/components/ui/tooltip';
import cn from '@app/utils/cn';
import type { EducationListItem, MediaFileTypes } from '@db/schema';

import CardHeader from './card-header';
import { buttonVariants } from '../ui/button';
import { useSidebar } from '../ui/sidebar/sidebar-context';

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
  const { setOpen } = useSidebar();
  return (
    <Card className="hover:bg-accent/30 gap-0 p-0 transition-shadow hover:shadow-md">
      <CardHeader education={education} />
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
        <Link
          to="/education/$educationId"
          params={{ educationId: String(education.id) }}
          className={cn(buttonVariants({ variant: 'default' }))}
          onClick={() => setOpen(false)}
        >
          Eğitimi Görüntüle
        </Link>
      </Card.Content>
    </Card>
  );
}

export default EducationCard;
