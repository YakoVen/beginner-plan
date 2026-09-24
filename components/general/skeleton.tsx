import React from "react";

export function SkeletonBox({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} {...props} />;
}

export function SkeletonText({ className = "", width = "w-full", ...props }: React.HTMLAttributes<HTMLDivElement> & { width?: string }) {
  return <div className={`h-4 rounded bg-gray-200 animate-pulse ${width} ${className}`} {...props} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm h-full">
      <SkeletonBox className="w-full h-[250px] sm:h-[300px] rounded-none" />
      <div className="p-4 flex flex-col flex-1 gap-2">
        <SkeletonText className="w-3/4 mb-1 h-5" />
        <SkeletonText className="w-1/2 mb-4 h-4" />
        <div className="mt-auto flex justify-between items-end">
          <SkeletonText className="w-1/3 h-6" />
          <SkeletonBox className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function OrderRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-100 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-20"></div>
    </div>
  );
}

export function CarouselSkeleton() {
  return (
    <div className="w-full">
      <div className="p-3 sm:p-5 border rounded-xl border-gray-200 w-full">
        <div className="rounded-xl overflow-hidden h-56 sm:h-72 md:h-96 w-full bg-gray-100 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        </div>
        <div className="flex gap-2 p-2 sm:p-3 border border-gray-200 my-2 rounded-xl h-20 sm:h-24">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-16 h-full bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-7xl items-center p-8 gap-12">
        <div className="flex-grow flex flex-col gap-4 w-full md:w-1/2">
          <div className="h-12 w-3/4 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-8 w-full bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-12 w-48 bg-blue-200 rounded-full animate-pulse mt-4" />
        </div>
        <div className="w-full md:w-1/2 h-[400px] bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}

export function SectionSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="px-4 sm:px-6 md:px-12 py-12">
      <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-2" />
      <div className="h-5 w-96 bg-gray-200 rounded-lg animate-pulse mb-8" />
      <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
        {Array.from({ length: rows }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
