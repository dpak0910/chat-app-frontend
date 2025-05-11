import { Skeleton } from "@heroui/react";

const MessagesSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div
            className={
              idx % 2 === 0
                ? "flex items-start space-x-2"
                : "flex flex-row-reverse items-start space-x-2 space-x-reverse"
            }
          >
            <div className="size-10 rounded-full">
              <Skeleton className="skeleton w-full h-full rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-12 w-[200px] rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesSkeleton;
