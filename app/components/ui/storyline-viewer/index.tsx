import Card from '../card';
import Dialog from '../dialog';
import StorylineHeader from './storyline-header';

function StorylineViewer() {
  return (
    <Dialog>
      <Dialog.Trigger>xx</Dialog.Trigger>
      <Dialog.Content
        className="min-w-screen min-h-screen p-0"
        showCloseButton={false}
      >
        <Card className="pointer-events-auto relative overflow-hidden border-none">
          <StorylineHeader />
          <Card.Content>
            <h1>Storyline Viewer</h1>
          </Card.Content>
        </Card>
      </Dialog.Content>
    </Dialog>
  );
}

export default StorylineViewer;
