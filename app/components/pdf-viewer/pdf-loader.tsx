import Card from '@app/components/ui/card';
import Skeleton from '@app/components/ui/skeleton';

function PdfLoader() {
  return (
    <Card.Content>
      <Skeleton className="aspect-video size-full" />
    </Card.Content>
  );
}

export default PdfLoader;
