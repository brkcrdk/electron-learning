import { Page } from 'react-pdf';

import { usePdfContext } from '../pdf-context';

interface Props {
  pageCount: number;
}

function PageList({ pageCount }: Props) {
  const { zoomLevel } = usePdfContext();
  return (
    <>
      {Array.from({ length: pageCount }).map((_, index) => (
        <Page
          key={`page-slider-${index + 1}`}
          pageNumber={index + 1}
          loading="Sayfa yükleniyor..."
          error="Sayfa yüklenirken hata oluştu."
          className="flex size-fit overflow-hidden rounded-md"
          scale={zoomLevel}
        />
      ))}
    </>
  );
}

export default PageList;
