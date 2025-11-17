import cn from "@/lib/cn";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import inputStyle from "@/components/ui/input/input.style";

type InputFieldSkeletonProps = {
  intent?: "text" | "password" | "search" | "textarea";
  className?: string;
};

export default function InputFieldSkeleton({
  intent = "text",
  className,
}: InputFieldSkeletonProps) {
  return (
    <Skeleton
      borderRadius={12}
      className={cn(
        inputStyle({ intent }),
        "min-h-[46px] hover:border-transparent tablet:min-h-[50px]",
        className,
      )}
    />
  );
}
