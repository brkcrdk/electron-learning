function TableLoader() {
  return (
    <div className="bg-base-100 w-full space-y-4 rounded-md p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="skeleton h-10 w-32" />
          <div className="skeleton h-10 w-24" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="skeleton h-10 w-40" />
          <div className="skeleton size-10 rounded-full" />
        </div>
      </div>

      <div className="space-y-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`table-loader-row-${i}`}
            className="flex items-center gap-3"
          >
            <div className="skeleton h-6 w-2/5 rounded-xl" />
            <div className="skeleton h-6 w-1/5 rounded-xl" />
            <div className="skeleton h-6 w-1/5 rounded-xl" />
            <div className="skeleton h-6 w-1/5 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default TableLoader;
