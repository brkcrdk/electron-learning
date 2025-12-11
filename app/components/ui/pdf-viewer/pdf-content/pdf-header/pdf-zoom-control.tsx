import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';

function PdfZoomControl() {
  return (
    <div className="webkit-no-draggable bg-accent/50 mr-24 flex items-center gap-4 rounded-md p-2">
      <Button
        variant="outline"
        size="icon"
      >
        <Icon name="zoom-out" />
      </Button>
      <span>100%</span>
      <Button
        variant="outline"
        size="icon"
      >
        <Icon name="zoom-in" />
      </Button>
    </div>
  );
}

export default PdfZoomControl;
