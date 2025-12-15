import ToggleGroup from '@app/components/ui/toggle-group';

function MyEducationsHeader() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Eğitimlerim</h1>

      <ToggleGroup
        type="single"
        defaultValue="all"
        variant="outline"
      >
        <ToggleGroup.Item value="all">Tümü</ToggleGroup.Item>
        <ToggleGroup.Item value="completed">Tamamlandı</ToggleGroup.Item>
        <ToggleGroup.Item value="in-progress">Devam Edenler</ToggleGroup.Item>
      </ToggleGroup>
    </header>
  );
}

export default MyEducationsHeader;
