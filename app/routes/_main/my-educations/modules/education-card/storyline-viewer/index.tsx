import Button from '@app/components/ui/button';
import Card from '@app/components/ui/card';
import Dialog from '@app/components/ui/dialog';

import StorylineHeader from './storyline-header';

interface Props {
  storyLink: string;
}

function StorylineViewer({ storyLink }: Props) {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Eğitimi Görüntüle</Button>
      </Dialog.Trigger>
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
