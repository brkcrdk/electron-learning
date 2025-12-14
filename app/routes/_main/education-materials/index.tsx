import { createFileRoute } from '@tanstack/react-router';

import Button from '@app/components/ui/button';
import UploadProvider from '@app/components/ui/upload-provider';

export const Route = createFileRoute('/_main/education-materials/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <UploadProvider
        accept="application/pdf"
        multiple={false}
        onChange={async file => {
          try {
            // File objesini ArrayBuffer'a çevir
            const arrayBuffer = await file.arrayBuffer();

            // Dosya bilgileriyle birlikte gönder
            const fileData = {
              name: file.name,
              size: file.size,
              type: file.type,
              content: arrayBuffer,
            };

            const result = await window.electronAPI.uploadContentMaterial(fileData);
            console.log('Upload result:', result);
          } catch (error) {
            console.error('Upload error:', error);
          }
        }}
      >
        <Button>Upload Education Materials</Button>
      </UploadProvider>
    </div>
  );
}
