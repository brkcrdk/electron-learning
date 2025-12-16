import Button from '@app/components/ui/button';
import Card from '@app/components/ui/card';
import Dialog from '@app/components/ui/dialog';

import VideoHeader from './video-header';
import VideoPlayer, { type VideoPlayerProps } from './video-player';

interface Props {
  videoProps: VideoPlayerProps;
}

function VideoViewer({ videoProps }: Props) {
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
          <VideoHeader />
          <Card.Content>
            <VideoPlayer {...videoProps} />
          </Card.Content>
        </Card>
      </Dialog.Content>
    </Dialog>
  );
}

export default VideoViewer;
