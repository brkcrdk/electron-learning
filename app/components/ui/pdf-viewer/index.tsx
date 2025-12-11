import { useState } from 'react';

import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Document, pdfjs, type DocumentProps } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import PdfContent from './pdf-content';
import PdfLoader from './pdf-loader';
import PdfLoadingError from './pdf-loading-error';

interface Props {
  documentProps?: DocumentProps;
}
// Vite ?url ile worker'ı build'e kopyalıyoruz; offline çalışır.
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function PdfViewer({ documentProps }: Props) {
  const [errorStatus, setErrorStatus] = useState<string>('');

  return (
    <Document
      {...documentProps}
      onError={error => console.error(error)}
      loading={<PdfLoader />}
      error={<PdfLoadingError errorReason={errorStatus} />}
      onLoadError={error => setErrorStatus(error.name)}
    >
      <PdfContent />
      {/* <Page pageNumber={1} /> */}
    </Document>
  );
}

export default PdfViewer;
