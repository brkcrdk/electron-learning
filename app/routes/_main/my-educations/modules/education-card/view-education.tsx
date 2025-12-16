import getContentPath from '@app/utils/get-content-path';
import type { EducationMaterialsListItem } from '@db/schema';

import PdfViewer from './pdf-viewer';

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
  return null;
}

export default ViewEducation;
