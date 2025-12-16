import Icon from '@app/components/ui/icon';

function EducationsEmptyState() {
  return (
    <div className="bg-base-200">
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="flex max-w-md flex-col items-center justify-center">
          <Icon
            name="folder-open-outline"
            className="mb-6 size-10"
          />
          <h1 className="text-3xl font-semibold">Sonuç Bulunamadı.</h1>
          <p className="text-base-content/50 py-6 font-medium">
            Sizin için henüz bir eğitim tanımlanmamış görünüyor veya aradığınız kriterlere uygun bir eğitim bulunamadı.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EducationsEmptyState;
