import { useCallback, useState } from 'react';

import type { FileUploadTypes } from '@api/upload-content-material/types';

import chunkFile from './chunkFile';
import type { ChunkCompletedStateProps, ChunkInProgressStateProps, ChunkStateProps } from './types';

const CHUNK_SIZE = 1 * 1024 * 1024; // 5MB

interface Props {
  uploadType: FileUploadTypes;
  onComplete?: (response: ChunkCompletedStateProps) => void;
  onProgress?: (progress: ChunkInProgressStateProps) => void;
}

function useFileUpload({ uploadType, onComplete, onProgress }: Props) {
  const [uploadState, setUploadState] = useState<ChunkStateProps | null>(null);

  const [controller, setController] = useState<AbortController | null>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      const uploadId = crypto.randomUUID();

      const fileListClone: ChunkStateProps = {
        status: 'pending',
        progress: 0,
        progressId: uploadId,
        file,
      };
      setUploadState(fileListClone);

      const updatedUploadState: ChunkStateProps[] = [];
      const fileChunks = chunkFile(fileListClone.file, CHUNK_SIZE);

      const abortController = new AbortController();
      setController(abortController);

      for (let i = 0; i < fileChunks.length; i++) {
        const chunk = fileChunks[i];
        const signal = abortController.signal;

        try {
          const chunkData = await chunk.arrayBuffer();
          const result = await window.electronAPI.uploadContentMaterial({
            uploadId,
            fileName: file.name,
            fileSize: file.size,
            fileType: uploadType,
            totalChunks: fileChunks.length,
            chunkIndex: i,
            chunkData,
          });

          let progress = 0;

          if (i !== 0) {
            progress = (i / (fileChunks.length - 1)) * 100;
          }

          if (result.success) {
            if (i === fileChunks.length - 1) {
              const completedState: ChunkCompletedStateProps = {
                status: 'completed',
                progress,
                progressId: uploadId,
                response: result.data,
                file,
              };
              updatedUploadState.push(completedState);
              setUploadState(completedState);

              if (onComplete) {
                onComplete(completedState);
              }
            } else {
              const inProgressState: ChunkInProgressStateProps = {
                status: 'in_progress',
                progress,
                progressId: uploadId,
                file,
              };
              setUploadState(inProgressState);

              if (onProgress) {
                onProgress(inProgressState);
              }
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
            progressId: uploadId,
            file,
          });
          console.error(error);
        }

        if (signal.aborted) {
          break;
        }
      }
    },
    [uploadType, controller, onComplete, onProgress]
  );

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

  const resetUploadState = useCallback(() => {
    setUploadState(null);
  }, []);

  return { handleUpload, uploadState, handleCancel, resetUploadState };
}

export default useFileUpload;
