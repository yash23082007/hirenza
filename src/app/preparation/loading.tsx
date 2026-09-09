export default function PreparationLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8">
        <div className="h-9 w-48 bg-surface-3 rounded-lg mb-3" />
        <div className="h-5 w-80 bg-surface-3 rounded-lg" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-border rounded-xl bg-surface-2 p-6">
            <div className="h-12 w-12 bg-surface-3 rounded-xl mb-4" />
            <div className="h-5 w-32 bg-surface-3 rounded mb-2" />
            <div className="h-4 w-full bg-surface-3 rounded mb-1" />
            <div className="h-4 w-2/3 bg-surface-3 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
