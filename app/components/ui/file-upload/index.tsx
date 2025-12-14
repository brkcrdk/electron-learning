import { useState } from 'react';

import type { ChunkStateProps } from '@app/hooks/use-file-upload/types';
import cn from '@app/utils/cn';

import Icon from '../icon';
import UploadProvider, { type UploadErrorReasonTypes, type UploadProviderProps } from '../upload-provider';
import ErrorReason from './error-reason';
import UploadingState from './uploading-state';

interface Props {
  uploadProviderProps: UploadProviderProps;
  uploadingProgress: ChunkStateProps | null;
}

function FileUpload({ uploadProviderProps, uploadingProgress }: Props) {
  const [errorReason, setErrorReason] = useState<UploadErrorReasonTypes>(null);

  return (
    <UploadProvider
      {...uploadProviderProps}
      rootProps={{
        className: cn(
          'group/upload border border-dashed w-full rounded-md flex flex-col items-center justify-center min-h-40 gap-2 p-1 text-center',
          'data-hovering:bg-accent',
          'data-error:bg-destructive/30'
        ),
      }}
      disabled={uploadingProgress !== null}
      onError={reason => {
        setErrorReason(reason);
        if (uploadProviderProps.onError) {
          uploadProviderProps.onError(reason);
        }
      }}
    >
      {errorReason ? (
        <ErrorReason
          errorReason={errorReason}
          sizeLimit={uploadProviderProps.sizeLimit}
        />
      ) : uploadingProgress ? (
        <UploadingState state={uploadingProgress} />
      ) : (
        <>
          <Icon
            name="copy"
            className="group-data/upload-layout:text-danger size-10"
          />
          <span className="flex gap-1 text-sm">
            <strong className="text-primary">Dosya yükleyin</strong>
            ya da sürükleyip bırakın
          </span>
        </>
      )}
    </UploadProvider>
  );
}
export default FileUpload;
