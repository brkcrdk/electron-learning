import { useEffect, useRef, useState } from 'react';

import { Document, type DocumentProps } from 'react-pdf';

import Card from '@app/components/ui/card';

import PdfHeader from './pdf-header';
import PdfLoader from '../pdf-loader';
import PdfLoadingError from '../pdf-loading-error';
import PageList from './page-list';

export interface PdfContentProps {
  documentProps: DocumentProps;
}

function PdfContent({ documentProps }: PdfContentProps) {
  const [errorStatus, setErrorStatus] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);
  const documentWrapperRef = useRef<HTMLDivElement | null>(null);

  // Expose document wrapper height as a CSS variable for consumers.
  useEffect(() => {
    const wrapperEl = documentWrapperRef.current;
    if (!wrapperEl || typeof ResizeObserver === 'undefined') return;

    const updateHeight = () => {
      const height = wrapperEl.clientHeight;
      wrapperEl.style.setProperty('--pdf-document-height', `${height}px`);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(wrapperEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Card className="pointer-events-auto relative overflow-hidden border-none">
      <PdfHeader />

      <Document
        {...documentProps}
        onLoadSuccess={({ numPages }) => {
          setPageCount(numPages);
        }}
        onError={error => console.error(error)}
        loading={<PdfLoader />}
        error={<PdfLoadingError errorReason={errorStatus} />}
        onLoadError={error => setErrorStatus(error.name)}
        className="h-full overflow-hidden"
        inputRef={documentWrapperRef}
      >
        <Card.Content className="bg-accent max-h-(--pdf-document-height) relative mx-4 flex h-full flex-col items-center gap-2 overflow-auto rounded-sm py-4">
          <PageList pageCount={pageCount} />
        </Card.Content>
      </Document>
    </Card>
  );
}

export default PdfContent;
