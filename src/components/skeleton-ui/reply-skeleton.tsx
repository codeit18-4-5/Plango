import cn from "@/lib/cn";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { replyWrapper, replyInner, replyInfo } from "@/components/ui/reply/index.styles";

type ReplySkeletonProps = {
  className?: string;
  variant?: "primary" | "secondary";
};

export default function ReplySkeleton({ variant = "primary", className }: ReplySkeletonProps) {
  return (
    <div className={cn(replyWrapper({ variant }), className)}>
      <div className={replyInner({ variant })}>
        <div>
          <Skeleton height={16} width={"70%"} />
          <Skeleton height={16} width={"62%"} style={{ marginTop: 8 }} />
        </div>
        <div className={replyInfo({ variant })}>
          <div className="flex items-center gap-x-3">
            <Skeleton circle={true} height={32} width={32} />
            <Skeleton height={14} width={72} />
          </div>
        </div>
      </div>
    </div>
  );
}
