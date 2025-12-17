import Button from '@app/components/ui/button';
import Card from '@app/components/ui/card';
import Dialog from '@app/components/ui/dialog';
import Icon from '@app/components/ui/icon';

interface Props {
  videoName?: string;
}

function StorylineHeader({ videoName = 'Video İçeriği' }: Props) {
  return (
    <Card.Header className="flex items-center justify-between border-b">
      {/* Title traffic light ışıklarının üstüne bindiği için soldan boşluk bırakıyoruz. */}
      <Dialog.Title className="webkit-no-draggable ml-24 text-lg font-medium">{videoName}</Dialog.Title>
      <Dialog.Close asChild>
        <Button
          className="webkit-no-draggable"
          size="icon"
          variant="secondary"
        >
          <Icon name="close" />
        </Button>
      </Dialog.Close>
    </Card.Header>
  );
}

export default StorylineHeader;
