import { type UploadErrorReasonTypes } from '.';

interface Props {
  fileList: FileList | DataTransferItemList;
  sizeLimit: number;
  /**
   * Bu tipe sadece onDrop yaparken ihtiyaç duyuyoruz. Çünkü input file otomatik
   * olarak typeları filtreliyor ama drop eventinde bu durum geçerli olmuyor.
   */
  acceptedTypes?: string[];
  onError?: (errorType: UploadErrorReasonTypes) => void;
  providerElement: HTMLElement;
}

const MB_TO_BYTES = 1024 * 1024;

function isFileSizeValid(file: File, sizeLimit: number) {
  return !sizeLimit || file.size <= sizeLimit * MB_TO_BYTES;
}

function isFileTypeAccepted(fileType: string, acceptedTypes: string[]) {
  return (
    acceptedTypes.length === 0 ||
    acceptedTypes.some(type => {
      const [mainType, subType] = type.split('/');
      return subType === '*' ? fileType.startsWith(mainType) : fileType === type;
    })
  );
}

function handleError(errorType: UploadErrorReasonTypes, providerElement: HTMLElement, onError?: (errorType: UploadErrorReasonTypes) => void) {
  providerElement.dataset.error = '';

  if (onError) {
    onError(errorType);
  }
}

/**
 * UploadProviderda onDrop ve onChange eventlerinde seçilen dosylar için yaptığımız validasyon kontrollerini
 * yöneten functiondır.
 */
function handleValidateFileList({ fileList, sizeLimit, acceptedTypes = [], onError, providerElement }: Props): File[] {
  const validFiles: File[] = [];

  const processFile = (file: File | null) => {
    if (!file) return;

    if (!isFileSizeValid(file, sizeLimit)) {
      handleError('sizeLimit', providerElement, onError);
      return;
    }

    if (!isFileTypeAccepted(file.type, acceptedTypes)) {
      handleError('invalidType', providerElement, onError);
      return;
    }

    validFiles.push(file);
  };

  for (let index = 0; index < fileList.length; index++) {
    const currentFile = fileList[index];

    if (currentFile instanceof File) {
      processFile(currentFile);
    } else {
      processFile(currentFile.getAsFile());
    }
  }

  return validFiles;
}

export default handleValidateFileList;
