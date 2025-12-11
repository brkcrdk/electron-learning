import Card from '../card';
import Skeleton from '../skeleton';

function PdfLoader() {
  return (
    <Card.Content>
      <Skeleton className="aspect-video size-full" />
    </Card.Content>
  );
}

export default PdfLoader;
