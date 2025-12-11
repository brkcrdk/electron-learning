import { useState } from 'react';

import { Document, type DocumentProps } from 'react-pdf';

import PdfHeader from './pdf-header';
import Card from '../../card';
import PdfLoader from '../pdf-loader';
import PdfLoadingError from '../pdf-loading-error';
import PageList from './page-list';

export interface PdfContentProps {
  documentProps: DocumentProps;
}

function PdfContent({ documentProps }: PdfContentProps) {
  const [errorStatus, setErrorStatus] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);

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
        className="h-full"
      >
        <Card.Content className="bg-accent max-h-100 relative mx-4 flex flex-col items-center gap-2 overflow-auto rounded-sm">
          <PageList pageCount={pageCount} />
        </Card.Content>
      </Document>
    </Card>
  );
}

export default PdfContent;
