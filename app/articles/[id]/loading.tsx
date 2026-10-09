import { CarouselSkeleton } from "@/components/general/skeleton";
import { SkeletonBox, SkeletonText } from "@/components/general/skeleton";

export default function ArticleLoading() {
  return (
    <div className="flex flex-col max-w-[1600px] mx-auto">
      <div className="px-4 md:px-8 mt-6">
        <div className="flex items-center gap-2 mb-2">
          <SkeletonBox className="w-4 h-4 rounded" />
          <SkeletonText width="w-20" />
          <SkeletonText width="w-32" />
        </div>
      </div>
      <div className="flex-grow p-4 md:p-8 pb-16 gap-6 lg:gap-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px] items-start">
        {/* Presentation skeleton */}
        <div className="w-full flex flex-col gap-4 min-w-0">
          <CarouselSkeleton />
          <SkeletonText width="w-2/3" className="h-8" />
          <SkeletonText width="w-1/4" className="h-7" />
          <SkeletonBox className="w-full h-32 rounded-xl" />
        </div>
        {/* Order card skeleton */}
        <div className="w-full lg:w-[400px] xl:w-[440px] shrink-0 p-6 bg-white shadow-lg rounded-2xl flex flex-col gap-4">
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
