import { useState } from 'react';

import { Document, type DocumentProps } from 'react-pdf';

import PdfHeader from './pdf-header';
import Card from '../../card';
import PdfLoader from '../pdf-loader';
import PdfLoadingError from '../pdf-loading-error';

export interface PdfContentProps {
  documentProps: DocumentProps;
}

function PdfContent({ documentProps }: PdfContentProps) {
  const [errorStatus, setErrorStatus] = useState<string>('');

  return (
    <Card className="pointer-events-auto relative overflow-hidden border-none">
      <PdfHeader />
      <Card.Content className="bg-accent mx-4 flex flex-col items-center justify-center gap-2 rounded-sm p-20">
        <Document
          {...documentProps}
          onLoadSuccess={({ numPages }) => {
            console.log('load success');
          }}
          onError={error => console.error(error)}
          loading={<PdfLoader />}
          error={<PdfLoadingError errorReason={errorStatus} />}
          onLoadError={error => setErrorStatus(error.name)}
        >
          <p className="text-xl">Test Content</p>
        </Document>
      </Card.Content>
    </Card>
  );
}

export default PdfContent;
