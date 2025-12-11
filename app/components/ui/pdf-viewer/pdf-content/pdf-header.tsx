import Card from '../../card';

function PdfHeader() {
  return (
    <Card.Header className="flex items-center justify-between border-b">
      <span className="text-muted-foreground text-sm">Test File</span>
    </Card.Header>
  );
}

export default PdfHeader;
