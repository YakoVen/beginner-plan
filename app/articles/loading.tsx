import { ProductCardSkeleton } from "@/components/general/skeleton";
import { SkeletonBox, SkeletonText } from "@/components/general/skeleton";

export default function ArticlesLoading() {
  return (
    <div className="w-full flex flex-col pb-12">
      {/* Main content skeleton */}
      <div className="flex-grow flex flex-col">
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
        <div className="p-3 sm:p-4 md:p-6">
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
