import { Document, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

function PdfViewer() {
  return (
    <Document
    // file={`${mediaBaseUrl}${fileUrl}`}
    // key={fileUrl}
    // onLoadSuccess={({ numPages }) => handleLoadSuccess(numPages)}
    // loading={<PdfLoader />}
    // error={<PdfLoadingError errorReason={errorStatus} />}
    // onLoadError={error => setErrorStatus(error.name)}
    >
      {/* <PdfContent /> */}
    </Document>
  );
}

export default PdfViewer;
