import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function HistoryListSkeleton() {
  return (
    <div className="mt-10 flex flex-col gap-4 [&>span]:text-center">
      <Skeleton height={22} width={180} />
      <Skeleton borderRadius={12} height={44} width={"100%"} />
      <Skeleton borderRadius={12} height={44} width={"100%"} />
      <Skeleton borderRadius={12} height={44} width={"100%"} />
    </div>
  );
}
