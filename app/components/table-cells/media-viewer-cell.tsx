import type { ComponentProps } from 'react';

import getContentPath from '@app/utils/get-content-path';
import type { MediaFile } from '@db/schema';

import PdfViewer from '../pdf-viewer';
import StorylineViewer from '../storyline-viewer';
import type Dialog from '../ui/dialog';
import VideoViewer from '../video-viewer';

type ContentProps = Pick<MediaFile, 'filePath' | 'fileName' | 'mediaType'>;

interface Props {
  mediaFile: ContentProps;
  triggerProps: ComponentProps<typeof Dialog.Trigger>;
}

function EducationalMaterialViewer({ mediaFile, triggerProps }: Props) {
  if (mediaFile.mediaType === 'pdfs') {
    return (
      <PdfViewer
        triggerProps={triggerProps}
        documentProps={{
          file: getContentPath(mediaFile.filePath),
        }}
      />
    );
  }

  if (mediaFile.mediaType === 'video') {
    return (
      <VideoViewer
        triggerProps={triggerProps}
        videoProps={{
          src: getContentPath(mediaFile.filePath),
          title: mediaFile.fileName,
        }}
      />
    );
  }
  if (mediaFile.mediaType === 'stories') {
    return (
      <StorylineViewer
        storyLink={getContentPath(mediaFile.filePath)}
        triggerProps={triggerProps}
      />
    );
  }
}

export default EducationalMaterialViewer;
