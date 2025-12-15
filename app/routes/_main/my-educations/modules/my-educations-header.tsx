import Button from '@app/components/ui/button';
import ButtonGroup from '@app/components/ui/button-group';

function MyEducationsHeader() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Eğitimlerim</h1>
      <ButtonGroup>
        <Button variant="secondary">xx</Button>
        <ButtonGroup.Separator />
        <Button variant="secondary">xx</Button>
      </ButtonGroup>
    </header>
  );
}

export default MyEducationsHeader;
