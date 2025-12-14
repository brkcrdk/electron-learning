import { useCallback, useEffect, useState } from 'react';

import chunkFile from './chunkFile';
import fileUpload from './fileUpload';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

export interface ChunkUploadReturnProps {
  handleCancel: () => void;
  handleUpload: (file: File) => Promise<void>;
  uploadState: ChunkStateProps | null;
  resetUploadState: () => void;
}

export interface ChunkUploadProps {
  uploadType: Exclude<FileUploadTypes, 'picture'>;
  onComplete?: (response: ChunkCompletedStateProps) => void;
  onProgress?: (progress: ChunkInProgressStateProps) => void;
}

function useChunkUpload({ uploadType, onComplete, onProgress }: ChunkUploadProps) {
  const [uploadState, setUploadState] = useState<ChunkStateProps | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  const resetUploadState = () => {
    setUploadState(null);
  };

  const handleUpload = useCallback(async (file: File) => {
    const fileListClone: ChunkStateProps = {
      status: 'pending',
      progress: 0,
      progressId: crypto.randomUUID(),
      file,
    };

    setUploadState(fileListClone);
    const updatedUploadState: ChunkStateProps[] = [];

    const fileChunks = chunkFile(fileListClone.file, CHUNK_SIZE);

    const abortController = new AbortController();
    setController(abortController);

    for (let i = 0; i < fileChunks.length; i++) {
      const chunk = fileChunks[i];
      const formData = new FormData();

      formData.append('index', String(i));
      formData.append('total', String(fileChunks.length));
      formData.append('fileSize', String(fileListClone.file.size));
      formData.append('file', chunk);
      formData.append('chunkSize', String(CHUNK_SIZE));
      formData.append('uuid', fileListClone.progressId);
      formData.append('orig', fileListClone.file.name);
      formData.append('partByteOffset', String(i * CHUNK_SIZE));

      const signal = abortController.signal;

      try {
        const res = await fileUpload({
          body: formData,
          controller: abortController,
          uploadType,
          enableChunkUpload: true,
        });
        const resJson: FileUploadResponseProps = await res.json();

        let progress = 0;

        if (i !== 0) {
          progress = (i / (fileChunks.length - 1)) * 100;
        }

        if (res.status === 200) {
          if (i === fileChunks.length - 1) {
            setUploadState(prev => {
              if (prev) {
                const newState: ChunkStateProps = {
                  ...prev,
                  progress: 100,
                  status: 'completed',
                  response: resJson,
                };
                return newState;
              } else {
                return null;
              }
            });
          } else {
            setUploadState(prev => {
              if (prev) {
                const newState: ChunkStateProps = {
                  ...prev,
                  status: 'in_progress',
                  progress,
                };
                return newState;
              } else {
                return null;
              }
            });
          }
        } else {
          setUploadState(prev => {
            if (prev) {
              return {
                ...prev,
                status: 'error',
                reason: 'Error happened while uploading chunk',
                progress,
              };
            } else {
              return null;
            }
          });
          if (controller) {
            controller.abort('Chunk upload sırasında bir hata oluştu.');
          }
        }
      } catch (error) {
        setUploadState({
          status: 'error',
          reason: 'Error happened while uploading chunk',
          progress: 0,
          progressId: crypto.randomUUID(),
          file,
        });
        console.error(error);
      }

      if (signal.aborted) {
        break;
      }
    }
    return updatedUploadState;
  }, []);

  const handleCancel = useCallback(() => {
    try {
      if (controller) {
        controller.abort('chunk upload iptal edildi.');
        setController(null);
        setUploadState(null);
      }
    } catch (error) {
      console.error('Error aborting request:', error);
    }
  }, [controller]);

  useEffect(() => {
    return () => {
      handleCancel();
    };
  }, [handleCancel]);

  useEffect(() => {
    if (uploadState?.status === 'completed') {
      if (onComplete) {
        onComplete(uploadState);
      }
    }
  }, [uploadState?.status]);

  useEffect(() => {
    if (uploadState?.status === 'in_progress') {
      if (onProgress) {
        onProgress(uploadState);
      }
    }
  }, [uploadState?.progress]);

  return { handleUpload, uploadState, handleCancel, resetUploadState };
}

export default useChunkUpload;
