import Button from '../button';
import Card from '../card';
import Dialog from '../dialog';
import Icon from '../icon';

function StorylineHeader() {
  return (
    <Card.Header className="flex items-center justify-between border-b">
      {/* Title traffic light ışıklarının üstüne bindiği için soldan boşluk bırakıyoruz. */}
      <Dialog.Title className="webkit-no-draggable ml-24 text-2xl font-medium">Storyline Viewer</Dialog.Title>
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
