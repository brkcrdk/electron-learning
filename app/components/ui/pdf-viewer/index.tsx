import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import PdfContent, { type PdfContentProps } from './pdf-content';
import Dialog from '../dialog';
import { PdfContextProvider } from './pdf-context';

// Vite ?url ile worker'ı build'e kopyalıyoruz; offline çalışır.
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function PdfViewer({ documentProps }: PdfContentProps) {
  return (
    <Dialog>
      <Dialog.Trigger>Pdf Viewer</Dialog.Trigger>
      <Dialog.Content
        className="min-w-screen min-h-screen p-0"
        showCloseButton={false}
      >
        <PdfContextProvider>
          <PdfContent documentProps={documentProps} />
        </PdfContextProvider>
      </Dialog.Content>
    </Dialog>
  );
}

export default PdfViewer;
