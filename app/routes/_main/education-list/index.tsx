import { createFileRoute } from '@tanstack/react-router';

import VideoPlayer from '@app/components/ui/video-player';

export const Route = createFileRoute('/_main/education-list/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <VideoPlayer
      src="https://files.vidstack.io/sprite-fight/720p.mp4"
      title="Sprite Fight"
    />
  );
}
