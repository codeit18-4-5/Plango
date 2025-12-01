import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReplySkeleton from "./reply-skeleton";

export function TabsSkeleton() {
  return (
    <div className="flex gap-[12px]">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} height={32} width={100} borderRadius={8} />
      ))}
    </div>
  );
}

export function TaskCardSkeleton() {
  return (
    <div className="mt-[16px] w-full rounded-lg border border-gray-700 bg-gray-800 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Skeleton height={20} width="30%" />
          <Skeleton height={16} width="17%" className="mt-2" />
        </div>
        <Skeleton width={15} height={24} />
      </div>
    </div>
  );
}

export function TaskListSkeleton() {
  return (
    <section className="pb-[24px]">
      {Array.from({ length: 3 }).map((_, index) => (
        <TaskCardSkeleton key={index} />
      ))}
    </section>
  );
}

export function TaskDetailHeaderSkeleton() {
  return (
    <div className="mb-[16px] flex w-full justify-between pr-[5px]">
      <Skeleton height={28} width={230} />
      <Skeleton width={20} height={24} />
    </div>
  );
}

export function TaskDetailAuthorSkeleton() {
  return (
    <div className="mb-[16px] flex items-center justify-between">
      <div className="flex items-center gap-[12px]">
        <Skeleton circle width={32} height={32} />
        <Skeleton height={16} width={80} />
      </div>
      <Skeleton height={16} width={100} />
    </div>
  );
}

export function TaskDetailFrequencySkeleton() {
  return (
    <div className="mb-[24px] flex gap-[10px]">
      <div className="flex gap-[7px]">
        <Skeleton width={16} height={16} />
        <Skeleton height={14} width={80} />
      </div>
      <span className="text-body-xs text-gray-500">|</span>
      <div className="flex gap-[7px]">
        <Skeleton width={16} height={16} circle />
        <Skeleton height={14} width={50} />
      </div>
      <span className="text-body-xs text-gray-500">|</span>
      <div className="flex gap-[7px]">
        <Skeleton width={16} height={16} />
        <Skeleton height={14} width={50} />
      </div>
    </div>
  );
}

export function TaskDetailDescriptionSkeleton() {
  return (
    <div className="h-[230px]">
      <Skeleton height={16} width="100%" className="mb-2" />
      <Skeleton height={16} width="90%" className="mb-2" />
      <Skeleton height={16} width="80%" className="mb-2" />
    </div>
  );
}

export function CommentInputSkeleton() {
  return (
    <div className="mb-[16px]">
      <Skeleton height={80} borderRadius={8} />
    </div>
  );
}

export function CommentItemSkeleton() {
  return (
    <div className="mb-[12px] rounded-lg border border-gray-200 p-[16px]">
      <div className="mb-[8px] flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <Skeleton circle width={24} height={24} />
          <Skeleton height={14} width={60} />
        </div>
        <Skeleton height={14} width={80} />
      </div>
      <Skeleton height={16} width="100%" className="mb-1" />
      <Skeleton height={16} width="70%" />
    </div>
  );
}

export function CommentsListSkeleton() {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <ReplySkeleton key={index} variant="secondary" />
      ))}
    </div>
  );
}

export function TaskDetailSkeleton() {
  return (
    <>
      <section>
        <TaskDetailHeaderSkeleton />
        <TaskDetailAuthorSkeleton />
        <TaskDetailFrequencySkeleton />
        <TaskDetailDescriptionSkeleton />
      </section>

      <section>
        <CommentInputSkeleton />
        <CommentsListSkeleton />
      </section>
    </>
  );
}
