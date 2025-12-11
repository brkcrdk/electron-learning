import { createFileRoute } from '@tanstack/react-router';

// import video from '@app/assets/test.mp4';
import VideoPlayer from '@app/components/ui/video-player';

export const Route = createFileRoute('/_main/education-list/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <VideoPlayer
      src="/public/videos/test.mp4"
      title="1 Minute Doggie Video"
    />
  );
}
