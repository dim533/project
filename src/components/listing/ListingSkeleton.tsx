import { Skeleton } from "../ui/skeleton";

export function ListingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Skeleton */}
      <Skeleton className="w-full h-[60vh]" />
      
      <div className="container mx-auto px-6 -mt-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeletons */}
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-96 rounded-2xl" />
            <Skeleton className="h-[400px] rounded-2xl" />
          </div>
          
          {/* Sidebar Skeletons */}
          <div className="space-y-6">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-80 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
} 