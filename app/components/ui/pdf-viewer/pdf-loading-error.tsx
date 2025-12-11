import Card from '../card';
import Icon from '../icon';

interface Props {
  errorReason?: string;
}

const errorMessages: Record<string, string> = {
  ResponseException: 'PDF yüklenirken hata oluştu.',
  default: 'Bilinmeyen bir hata oluştu.',
};

function PdfLoadingError({ errorReason = 'default' }: Props) {
  return (
    <Card
      data-node-type="PDF_DOCUMENT"
      className="pointer-events-auto relative overflow-hidden"
    >
      <Card.Header className="flex items-center justify-between border-b">
        <span className="text-muted-foreground text-sm">Test File</span>
      </Card.Header>
      <Card.Content className="bg-accent mx-4 flex flex-col items-center justify-center gap-2 rounded-sm p-20">
        <Icon
          name="alert-triangle"
          className="text-destructive size-10"
        />
        <p className="text-xl">{errorMessages[errorReason]}</p>
      </Card.Content>
    </Card>
  );
}

export default PdfLoadingError;
