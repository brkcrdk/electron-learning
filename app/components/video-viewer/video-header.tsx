import Button from '@app/components/ui/button';
import Card from '@app/components/ui/card';
import Dialog from '@app/components/ui/dialog';
import Icon from '@app/components/ui/icon';

function StorylineHeader() {
  return (
    <Card.Header className="flex items-center justify-between border-b">
      {/* Title traffic light ışıklarının üstüne bindiği için soldan boşluk bırakıyoruz. */}
      <Dialog.Title className="webkit-no-draggable ml-24 text-2xl font-medium">Video Viewer</Dialog.Title>
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
