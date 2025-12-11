import { Page } from 'react-pdf';

interface Props {
  pageCount: number;
}

function PageList({ pageCount }: Props) {
  return (
    <>
      {Array.from({ length: pageCount }).map((_, index) => (
        <Page
          key={`page-slider-${index + 1}`}
          pageNumber={index + 1}
          loading="Sayfa yükleniyor..."
          error="Sayfa yüklenirken hata oluştu."
          className="flex size-fit overflow-hidden rounded-md"
          scale={2.4}
        />
      ))}
    </>
  );
}

export default PageList;
