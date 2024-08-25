import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="border-none shadow-md overflow-hidden flex flex-col">
      {/* Image Skeleton */}
      <div className="relative w-full h-0 pb-[100%]">
        <Skeleton className="absolute top-0 left-0 w-full h-full rounded-none" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-2">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4" />
        {/* Description Skeleton */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        {/* Price Skeleton */}
        <Skeleton className="h-8 w-1/3" />
      </div>
      {/* Footer Skeleton */}
      <div className="p-4 flex justify-between items-center">
        {/* Match Badge Skeleton */}
        <Skeleton className="h-6 w-1/4 rounded-lg" />
        {/* Thumbs Up/Down Skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const SearchResultsSkeleton = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-4 w-full">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default SearchResultsSkeleton;
