import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';

import { usePdfContext } from '../../pdf-context';

function PdfZoomControl() {
  const { zoomLevel, handleZoomIn, handleZoomOut } = usePdfContext();

  return (
    /**
     * NOTE: Traffic light ışıkları nedeniyle titleı 24px soldan boşluk bıraktığımız zaman
     * zoom control da sağa kayık gibi oluyor. Ortalamak için benzer şekilde buraya da sağdan
     * margin koyarak durumu nötralize ediyoruz.
     */
    <div className="webkit-no-draggable bg-accent/50 mr-24 flex items-center gap-4 rounded-md p-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleZoomOut}
      >
        <Icon name="zoom-out" />
      </Button>
      <span>{Math.round(zoomLevel * 100)}%</span>
      <Button
        variant="outline"
        size="icon"
        onClick={handleZoomIn}
      >
        <Icon name="zoom-in" />
      </Button>
    </div>
  );
}

export default PdfZoomControl;
