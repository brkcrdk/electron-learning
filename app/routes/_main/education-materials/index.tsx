import { createFileRoute } from '@tanstack/react-router';

import Button from '@app/components/ui/button';
import UploadProvider from '@app/components/ui/upload-provider';
import useFileUpload from '@app/hooks/use-file-upload';

export const Route = createFileRoute('/_main/education-materials/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleUpload, uploadState, handleCancel, resetUploadState } = useFileUpload({ uploadType: 'pdfs' });

  return (
    <div>
      <UploadProvider
        accept="application/pdf"
        multiple={false}
        onChange={async file => {
          handleUpload(file);
        }}
      >
        <Button>Upload Education Materials</Button>
      </UploadProvider>
      <pre>{JSON.stringify(uploadState, null, 4)}</pre>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  );
}
