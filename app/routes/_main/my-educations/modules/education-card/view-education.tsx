import type { EducationListItem, EducationMaterials } from '@db/schema';

import PdfViewer from './pdf-viewer';

interface Props {
  educationMaterial: EducationMaterials;
}

function ViewEducation({ educationMaterial }: Props) {
  if (educationMaterial.contentType === 'pdfs') {
    // return <PdfViewer documentProps={educationMaterial.contentFileId} />;
    return 'pdf';
  }
  return null;
}

export default ViewEducation;
