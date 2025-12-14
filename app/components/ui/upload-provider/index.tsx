import { type HTMLAttributes, type PropsWithChildren, useRef, useState, type Ref } from 'react';

import cd from '@app/utils/cd';

import handleValidateFileList from './handleValidateFileList';

export type UploadErrorReasonTypes = null | 'invalidType' | 'uploadLimit' | 'sizeLimit' | 'connectionError';

export interface UploadProviderProps extends PropsWithChildren {
  onChange: (fileList: File) => void;
  onError?: (reason: UploadErrorReasonTypes) => void;
  rootProps?: HTMLAttributes<HTMLDivElement>;
  /**
   * MB cinsinden dosya boyutu limiti. Eğer bir limit belirtilmezse dosya boyutu kontrolü yapılmaz.
   * @defaultValue `5`
   */
  sizeLimit?: number;
  accept: string;
  /**
   * @defaultValue `uploadProviderInput`
   */
  inputId?: string;
  /**
   * @defaultValue `false`
   */
  disabled?: boolean;
  ref?: Ref<HTMLDivElement>;
}

/**
 * Bu component dosya upload işlemleri sırasında kullanılan input tipi için tekrar eden işlemleri ve drag/drop işlemlerini
 * bir standart olarak yönetmek adına oluşturulmuş `headless` bir componenttir.
 */
function UploadProvider({
  children,
  onError,
  accept,
  inputId = 'uploadProviderInput',
  disabled = false,
  rootProps,
  sizeLimit = 5,
  onChange,
  ref,
}: UploadProviderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Önceden kalma hata mesajı varsa temizler
  const handleClearError = (targetElement: HTMLElement) => {
    delete targetElement.dataset.error;
    if (onError) {
      onError(null);
    }
  };

  return (
    <div
      ref={ref}
      data-disabled={disabled}
      onClick={() => {
        if (!disabled && inputRef.current) {
          inputRef.current.click();
        }
      }}
      id="upload-provider"
      onDrop={e => {
        e.preventDefault();
        if (!disabled) {
          setIsHovering(false);

          handleClearError(e.currentTarget);

          const droppedItems = e.dataTransfer.items;
          const acceptedTypes = accept.split(',');

          if (droppedItems.length > 1 && onError) {
            e.currentTarget.dataset.error = '';
            return onError('uploadLimit');
          }

          const files = handleValidateFileList({
            fileList: droppedItems,
            sizeLimit,
            onError,
            providerElement: e.currentTarget,
            acceptedTypes,
          });

          /**
           * Eğer provider çoklu import desteklemiyorsa ondrop yapıldığında ilk file return edilir.
           */
          if (files.length > 0) {
            onChange(files[0]);
          }
        }
      }}
      onDragOver={e => {
        setIsHovering(true);
        e.preventDefault();
      }}
      onDragLeave={e => {
        e.preventDefault();
        setIsHovering(false);
      }}
      data-hovering={cd(isHovering)}
      {...rootProps}
    >
      {children}
      <input
        id={inputId}
        type="file"
        className="hidden"
        accept={accept}
        onChange={e => {
          const uploadProvider = document.getElementById('upload-provider');
          const files = e.target.files;
          if (uploadProvider && files) {
            handleClearError(uploadProvider);

            const validFiles = handleValidateFileList({
              fileList: files,
              sizeLimit,
              onError,
              providerElement: uploadProvider,
            });

            /**
             * Eğer provider çoklu import desteklemiyorsa ondrop yapıldığında ilk file return edilir.
             */
            if (validFiles.length > 0) {
              onChange(validFiles[0]);
            }
          }
        }}
        ref={inputRef}
        disabled={disabled}
      />
    </div>
  );
}
export default UploadProvider;
