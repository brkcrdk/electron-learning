import PdfViewer from '@app/components/pdf-viewer';
import StorylineViewer from '@app/components/storyline-viewer';
import Button from '@app/components/ui/button';
import VideoViewer from '@app/components/video-viewer';
import getContentPath from '@app/utils/get-content-path';
import type { EducationMaterialsListItem } from '@db/schema';

interface Props {
  educationMaterial: EducationMaterialsListItem;
}

function ViewEducation({ educationMaterial }: Props) {
  if (educationMaterial.contentType === 'pdfs') {
    return (
      <PdfViewer
        title={educationMaterial.name}
        triggerProps={{
          asChild: true,
          children: <Button>Eğitimi Görüntüle</Button>,
        }}
        documentProps={{
          file: getContentPath(educationMaterial.contentFile.filePath),
        }}
      />
    );
  }

  if (educationMaterial.contentType === 'video') {
    return (
      <VideoViewer
        title={educationMaterial.name}
        triggerProps={{
          asChild: true,
          children: <Button>Eğitimi Görüntüle</Button>,
        }}
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
        title={educationMaterial.name}
        triggerProps={{
          asChild: true,
          children: <Button>Eğitimi Görüntüle</Button>,
        }}
      />
    );
  }
}

export default ViewEducation;
