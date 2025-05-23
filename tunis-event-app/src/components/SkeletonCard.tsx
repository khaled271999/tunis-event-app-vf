import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col space-y-3 w-full max-w-[400px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px]">
        <Skeleton className="h-[150px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </div>
    </div>
  );
}
