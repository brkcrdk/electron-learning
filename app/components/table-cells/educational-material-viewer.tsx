import type { ComponentProps } from 'react';

import getContentPath from '@app/utils/get-content-path';
import type { EducationMaterialsListItem } from '@db/schema';

import PdfViewer from '../pdf-viewer';
import StorylineViewer from '../storyline-viewer';
import type Dialog from '../ui/dialog';
import VideoViewer from '../video-viewer';

interface Props {
  educationMaterial: EducationMaterialsListItem;
  triggerProps: ComponentProps<typeof Dialog.Trigger>;
}

function EducationalMaterialViewer({ educationMaterial, triggerProps }: Props) {
  if (educationMaterial.contentType === 'pdfs') {
    return (
      <PdfViewer
        triggerProps={triggerProps}
        documentProps={{
          file: getContentPath(educationMaterial.contentFile.filePath),
        }}
      />
    );
  }

  if (educationMaterial.contentType === 'video') {
    return (
      <VideoViewer
        triggerProps={triggerProps}
        videoProps={{
          src: getContentPath(educationMaterial.contentFile.filePath),
          title: educationMaterial.name,
        }}
      />
    );
  }
  if (educationMaterial.contentType === 'stories') {
    return (
      <StorylineViewer
        storyLink={getContentPath(educationMaterial.contentFile.filePath)}
        triggerProps={triggerProps}
      />
    );
  }
}

export default EducationalMaterialViewer;
