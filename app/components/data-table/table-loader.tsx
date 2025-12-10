import Skeleton from '../ui/skeleton';

function TableLoader() {
  return (
    <div className="bg-base-100 w-full space-y-4 rounded-md p-4">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="w-100 h-8" />
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="space-y-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`table-loader-row-${i}`}
            className="flex items-center gap-3"
          >
            <Skeleton className="h-6 w-2/5" />
            <Skeleton className="h-6 w-1/5" />
            <Skeleton className="h-6 w-1/5" />
            <Skeleton className="h-6 w-1/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default TableLoader;
