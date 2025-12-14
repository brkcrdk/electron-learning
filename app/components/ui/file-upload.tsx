import { useState } from 'react';

// import { useIntl } from 'react-intl';

import Icon from './icon';
import Spinner from './spinner';
import UploadProvider, { type UploadProviderProps, type UploadErrorReasonTypes } from './upload-provider';
import cn from '../../utils/cn';

interface Props<T extends boolean> {
  isUploading: boolean;
  uploadProviderProps: UploadProviderProps<T>;
}

const errorMessages: Record<string, string> = {
  title: 'Dosya yüklemeye çalışırken bir hata oluştu!',
  invalidType: 'Geçersiz dosya tipi. Lütfen geçerli bir dosya deneyiniz.',
  uploadLimit: 'Birden fazla dosya sürüklendi. Lütfen sadece bir tane dosya ile deneyiniz.',
  connectionError: 'Dosya yüklenmesi sırasında bağlantı sorunu oluştu. Lütfen tekrar deneyiniz.',
  sizeLimit: 'Yüklemek istediğiniz dosya boyutu limitlerin üstündedir.',
  sizeLimitDescription: 'Yüklemek istediğiniz dosya {size}tan büyük olmamalıdır.',
};

/**
 * Bazı yerlerde dosya boyutunu KB cinsinden kabul edebiliyoruz altında bekliyoruz.
 * Bu durumda da size değeri ondalıklı olarak geliyor. Bunu da text içinde render ederken `0.5 MB` şeklinde
 * göstermek yerine 500KB şeklinde göstermek için bu şekilde bir function kullanıyoruz.
 *
 * @example
 * humanizeSize(0.5) => '500 KB'
 * humanizeSize(1) => '1 MB'
 */
function humanizeSize(size?: number) {
  if (!size) {
    return '0 KB';
  }
  if (size < 1) {
    return `${size * 1000} KB`;
  }
  return `${size} MB`;
}

function FileUpload<T extends boolean>({ uploadProviderProps, isUploading }: Props<T>) {
  // const { $t } = useIntl();

  const [errorReason, setErrorReason] = useState<UploadErrorReasonTypes>(null);

  return (
    <UploadProvider
      {...uploadProviderProps}
      rootProps={{
        className: cn(
          'group/upload-layout border border-dashed border-dark-300 w-full p-1 rounded-lg flex-col bg-gray-100 cursor-pointer flex justify-center items-center min-h-40 gap-2',
          'data-hovering:bg-success/20 data-hovering:border-success',
          'data-error:bg-danger/20 data-error:border-danger'
        ),
      }}
      onError={reason => {
        setErrorReason(reason);
        if (uploadProviderProps.onError) {
          uploadProviderProps.onError(reason);
        }
      }}
    >
      {isUploading ? (
        <div className="flex gap-2">
          <Spinner />
          <span className="text-xl font-bold">Yükleniyor.....</span>
        </div>
      ) : (
        <>
          <Icon
            name={errorReason ? 'alert-triangle' : 'copy'}
            className="group-data/upload-layout:text-danger size-10 text-gray-600"
          />
          {errorReason ? (
            <>
              <span className="text-sm">Hata oluştu</span>
              <strong className="text-sm">{errorMessages[errorReason]}</strong>
              {errorReason === 'sizeLimit' && (
                <span className="text-sm">Yüklemek istediğiniz dosya {humanizeSize(uploadProviderProps.sizeLimit)}tan büyük olmamalıdır.</span>
              )}
            </>
          ) : (
            <span className="flex gap-1 text-sm">
              <strong className="text-primary">Dosya yükle</strong>
              ya da sürükleyip bırakın veya tıklayın
            </span>
          )}
        </>
      )}
    </UploadProvider>
  );
}
export default FileUpload;
