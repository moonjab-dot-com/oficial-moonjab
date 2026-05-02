import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-shimmer rounded-md bg-muted relative overflow-hidden", className)}
      {...props}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-clovely-md">
      <div className="space-y-4">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <Skeleton className="h-10 w-[120px]" />
      </div>
    </div>
  );
}

function SkeletonDashboard() {
  return (
    <div className="space-y-8 p-8">
      {/* Header skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-[300px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Content area skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-[400px] rounded-2xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[200px] rounded-2xl" />
          <Skeleton className="h-[180px] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonDashboard };
