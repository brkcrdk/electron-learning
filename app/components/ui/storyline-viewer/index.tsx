import Card from '../card';
import Dialog from '../dialog';
import StorylineHeader from './storyline-header';

interface Props {
  storyLink: string;
}
function StorylineViewer({ storyLink }: Props) {
  return (
    <Dialog>
      <Dialog.Trigger>Storyline Viewer</Dialog.Trigger>
      <Dialog.Content
        className="min-w-screen min-h-screen p-0"
        showCloseButton={false}
      >
        <Card className="pointer-events-auto relative overflow-hidden border-none">
          <StorylineHeader />
          <Card.Content>
            <iframe
              src={storyLink}
              className="size-full rounded-sm"
              title="Storyline Viewer"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin"
            />
          </Card.Content>
        </Card>
      </Dialog.Content>
    </Dialog>
  );
}

export default StorylineViewer;
