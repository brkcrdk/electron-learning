// import { usePdfContext } from "@centrio/editor/nodes/pdf-node/pdf-context";
// import { Card, CardContent, CardHeader } from "@centrio/ui/components/card";
// import { Skeleton } from "@centrio/ui/components/skeleton";
// import cn from "@centrio/ui/utils/cn";
import Card from '../card';
import Skeleton from '../skeleton';

function PdfLoader() {
  return (
    <Card className="pointer-events-auto relative overflow-hidden">
      <Card.Header className="flex items-center justify-between border-b">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-40" />
      </Card.Header>
      <Card.Content className="bg-accent mx-4 flex items-center justify-center rounded-sm p-2">
        <Skeleton className="max-h-100 aspect-video h-full w-full" />
      </Card.Content>
    </Card>
  );
}

export default PdfLoader;
