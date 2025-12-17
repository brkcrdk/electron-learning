import Icon from '@app/components/ui/icon';

function ExampleFile() {
  return (
    <a
      className="bg-accent/50 hover:bg-accent/80 w-full gap-4 rounded-md p-2"
      download="ornek-atama-listesi.xlsx"
      href="/assets/ornek-atama-listesi.xlsx"
    >
      <div className="relative flex items-center gap-2">
        <Icon
          name="file-excel"
          className="size-10"
        />
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium">ornek-atama-listesi.xlsx</span>
          <span className="text-muted-foreground text-xs">0.5 KB</span>
        </div>
        <Icon
          name="download"
          className="absolute right-1 top-1 size-5"
        />
      </div>
      <span className="text-muted-foreground text-xs">
        Dosyada sadece <strong>"username"</strong> ve <strong>"name"</strong> alanları bulunmalıdır; her bir satır bir kişiyi ifade etmelidir.
      </span>
    </a>
  );
}

export default ExampleFile;
