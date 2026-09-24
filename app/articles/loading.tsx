import { ProductCardSkeleton } from "@/components/general/skeleton";
import { SkeletonBox, SkeletonText } from "@/components/general/skeleton";

export default function ArticlesLoading() {
  return (
    <div className="flex flex-col md:flex-row h-screen pt-20 overflow-hidden">
      {/* Sidebar skeleton */}
      <div className="hidden md:flex md:w-64 md:border-r md:flex-shrink-0 flex-col p-4 gap-4">
        <SkeletonText className="h-7 w-24" />
        <div className="space-y-3">
          <SkeletonText width="w-20" className="h-4" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <SkeletonBox className="w-5 h-5 rounded" />
              <SkeletonText width="w-24" />
            </div>
          ))}
        </div>
        <SkeletonText className="h-4 w-12 mt-4" />
        <SkeletonBox className="h-2 w-full rounded" />
      </div>
      {/* Main content skeleton */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <div className="px-3 sm:px-4 md:px-6 pt-4 shrink-0 space-y-3">
          <div className="flex gap-2">
            <SkeletonBox className="w-4 h-4 rounded" />
            <SkeletonText width="w-20" />
          </div>
          <div className="flex gap-2 justify-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBox key={i} className="h-9 w-28 rounded-full" />
            ))}
          </div>
          <div className="flex justify-between">
            <SkeletonText width="w-36" />
            <SkeletonBox className="h-9 w-32 rounded" />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-3 sm:p-4 md:p-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
