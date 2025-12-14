import { useCallback, useEffect, useState } from 'react';

import fileUpload from './fileUpload';

export interface SingleFileUploadReturnProps {
  handleCancel: () => void;
  handleUpload: (file: File) => Promise<void>;
  uploadState: SingleFileUploadState | null;
  resetUploadState: () => void;
}

export interface SingleFileUploadProps {
  uploadType: FileUploadTypes;
  onComplete?: (response: FileUploadResponseProps) => void;
}

function useSingleUpload({ uploadType, onComplete }: SingleFileUploadProps): SingleFileUploadReturnProps {
  const [controller, setController] = useState<AbortController | null>(null);
  const [uploadState, setUploadState] = useState<SingleFileUploadState | null>(null);

  const resetUploadState = () => {
    setUploadState(null);
  };

  const handleUpload = useCallback(async (file: File) => {
    const abortController = new AbortController();
    setController(abortController);
    setUploadState({
      progress: 0,
      progressId: crypto.randomUUID(),
      status: 'in_progress',
      file,
    });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('uuid', crypto.randomUUID());
    formData.append('orig', file.name);
    formData.append('size', file.size.toString());

    try {
      const res = await fileUpload({
        body: formData,
        controller: abortController,
        uploadType,
        enableChunkUpload: false,
      });
      const resJson: FileUploadResponseProps = await res.json();

      if (res.status === 200) {
        setUploadState({
          status: 'completed',
          progress: 100,
          progressId: crypto.randomUUID(),
          response: resJson,
          file,
        });
        if (onComplete) {
          onComplete(resJson);
        }
      } else {
        setUploadState({
          status: 'error',
          progress: 0,
          progressId: crypto.randomUUID(),
          reason: 'Dosya yüklemeye çalışırken bir hata oluştu!',
          file,
        });
        if (controller) {
          controller.abort('Chunk upload sırasında bir hata oluştu.');
        }
      }
    } catch (error) {
      setUploadState({
        status: 'error',
        progress: 0,
        progressId: crypto.randomUUID(),
        reason: 'Dosya yüklemeye çalışırken bir hata oluştu!',
        file,
      });
      console.error(error);
    }
  }, []);

  const handleCancel = useCallback(() => {
    try {
      if (controller) {
        controller.abort('File upload iptal edildi.');
        setController(null);
        setUploadState(null);
      }
    } catch (error) {
      console.error('Error aborting request:', error);
    }
  }, [controller]);

  useEffect(() => {
    /**
     * Component unmount olurken devam eden bir yükleme işlemi varsa iptal et.
     */
    return () => {
      handleCancel();
    };
  }, [handleCancel]);

  return { handleCancel, handleUpload, uploadState, resetUploadState };
}

export default useSingleUpload;
