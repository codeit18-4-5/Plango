import cn from "@/lib/cn";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function KakaoSkeleton({ line = false }: { line?: boolean }) {
  return (
    <div className={cn(!line && "full-scroll-h flex items-center justify-center")}>
      <Skeleton
        height={12}
        width={150}
        style={{ marginBottom: 48, background: "var(--pink-400)" }}
      />
    </div>
  );
}
