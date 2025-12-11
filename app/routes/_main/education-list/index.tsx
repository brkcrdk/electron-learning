import { createFileRoute } from '@tanstack/react-router';

import PdfViewer from '@app/components/ui/pdf-viewer';
import StorylineViewer from '@app/components/ui/storyline-viewer';
import VideoPlayer from '@app/components/ui/video-player';

export const Route = createFileRoute('/_main/education-list/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* <VideoPlayer
        src="/public/videos/test.mp4"
        title="1 Minute Doggie Video"
      /> */}
      <PdfViewer
        documentProps={{
          file: '/public/pdf/test.pdf',
        }}
      />
      <StorylineViewer />
    </>
  );
}
