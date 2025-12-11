import PdfHeader from './pdf-header';
import Card from '../../card';

function PdfContent() {
  return (
    <Card className="pointer-events-auto relative overflow-hidden border-none">
      <PdfHeader />
      <Card.Content className="bg-accent mx-4 flex flex-col items-center justify-center gap-2 rounded-sm p-20">
        <p className="text-xl">Test Content</p>
      </Card.Content>
    </Card>
  );
}

export default PdfContent;
