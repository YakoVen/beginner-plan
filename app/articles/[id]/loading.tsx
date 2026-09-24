import { CarouselSkeleton } from "@/components/general/skeleton";
import { SkeletonBox, SkeletonText } from "@/components/general/skeleton";

export default function ArticleLoading() {
  return (
    <div className="min-h-screen pt-20 flex flex-col max-w-7xl mx-auto">
      <div className="px-4 mt-2">
        <div className="flex items-center gap-2 mb-2">
          <SkeletonBox className="w-4 h-4 rounded" />
          <SkeletonText width="w-20" />
          <SkeletonText width="w-32" />
        </div>
      </div>
      <div className="flex-grow p-4 gap-8 flex flex-col lg:flex-row">
        {/* Presentation skeleton */}
        <div className="w-full lg:w-3/5 flex flex-col items-center gap-4">
          <CarouselSkeleton />
          <SkeletonText width="w-2/3" className="h-8" />
          <SkeletonText width="w-1/4" className="h-7" />
          <SkeletonBox className="w-full h-32 rounded-xl" />
        </div>
        {/* Order card skeleton */}
        <div className="flex-grow lg:w-2/5 p-6 bg-white shadow-lg rounded-2xl flex flex-col gap-4">
          <SkeletonBox className="h-14 w-full rounded-xl" />
          <SkeletonBox className="h-12 w-full rounded-xl" />
          <SkeletonBox className="h-12 w-full rounded-xl" />
          <SkeletonBox className="h-12 w-full rounded-xl" />
          <SkeletonBox className="h-12 w-full rounded-xl" />
          <SkeletonBox className="h-12 w-full rounded-xl" />
          <SkeletonBox className="h-32 w-full rounded-xl" />
          <SkeletonBox className="h-14 w-full rounded-xl bg-blue-100" />
        </div>
      </div>
    </div>
  );
}
