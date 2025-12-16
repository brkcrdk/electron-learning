import getContentPath from '@app/utils/get-content-path';
import type { EducationMaterialsListItem } from '@db/schema';

import PdfViewer from './pdf-viewer';
import StorylineViewer from './storyline-viewer';
import VideoViewer from './video-viewer';

interface Props {
  educationMaterial: EducationMaterialsListItem;
}

function ViewEducation({ educationMaterial }: Props) {
  if (educationMaterial.contentType === 'pdfs') {
    return (
      <PdfViewer
        documentProps={{
          file: getContentPath(educationMaterial.contentFile.filePath),
        }}
      />
    );
  }

  if (educationMaterial.contentType === 'video') {
    return (
      <VideoViewer
        videoProps={{
          src: getContentPath(educationMaterial.contentFile.filePath),
          title: educationMaterial.name,
        }}
      />
    );
  }
  if (educationMaterial.contentType === 'stories') {
    return <StorylineViewer storyLink={getContentPath(educationMaterial.contentFile.filePath)} />;
  }
}

export default ViewEducation;
