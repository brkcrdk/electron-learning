import type { ComponentProps } from 'react';

import Card from '@app/components/ui/card';
import Dialog from '@app/components/ui/dialog';

import VideoHeader from './video-header';
import VideoPlayer, { type VideoPlayerProps } from './video-player';

interface Props {
  videoProps: VideoPlayerProps;
  triggerProps: ComponentProps<typeof Dialog.Trigger>;
  title?: string;
}

function VideoViewer({ videoProps, triggerProps, title }: Props) {
  return (
    <Dialog>
      <Dialog.Trigger {...triggerProps} />
      <Dialog.Content
        className="min-w-screen min-h-screen p-0"
        showCloseButton={false}
      >
        <Card className="pointer-events-auto relative overflow-hidden border-none">
          <VideoHeader videoName={title} />
          <Card.Content>
            <VideoPlayer {...videoProps} />
          </Card.Content>
        </Card>
      </Dialog.Content>
    </Dialog>
  );
}

export default VideoViewer;
