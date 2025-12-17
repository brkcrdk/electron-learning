import getContentPath from '@app/utils/get-content-path';
import type { MediaFile } from '@db/schema';

import PdfViewer from '../pdf-viewer';
import StorylineViewer from '../storyline-viewer';
import Button from '../ui/button';
import Icon from '../ui/icon';
import VideoViewer from '../video-viewer';

type ContentProps = Pick<MediaFile, 'filePath' | 'fileName' | 'mediaType'>;

interface Props {
  mediaFile: ContentProps;
  title?: string;
}

function EducationalMaterialViewer({ mediaFile, title = '' }: Props) {
  if (mediaFile.mediaType === 'pdfs') {
    return (
      <PdfViewer
        title={title}
        documentProps={{
          file: getContentPath(mediaFile.filePath),
        }}
        triggerProps={{
          asChild: true,
          children: (
            <Button variant="outline">
              <Icon
                name="file-pdf"
                className="size-5"
              />
              {title}
            </Button>
          ),
        }}
      />
    );
  }

  if (mediaFile.mediaType === 'video') {
    return (
      <VideoViewer
        title={title}
        videoProps={{
          src: getContentPath(mediaFile.filePath),
          title: mediaFile.fileName,
        }}
        triggerProps={{
          asChild: true,
          children: (
            <Button variant="outline">
              <Icon
                name="file-image"
                className="size-5"
              />
              {title}
            </Button>
          ),
        }}
      />
    );
  }
  if (mediaFile.mediaType === 'stories') {
    return (
      <StorylineViewer
        title={title}
        storyLink={getContentPath(mediaFile.filePath)}
        triggerProps={{
          asChild: true,
          children: (
            <Button variant="outline">
              <Icon
                name="file-easel"
                className="size-5"
              />
              {title}
            </Button>
          ),
        }}
      />
    );
  }
}

export default EducationalMaterialViewer;
