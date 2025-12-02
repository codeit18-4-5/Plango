import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Container } from "../layout";

export default function TeamSkeleton() {
  return (
    <Container>
      <Skeleton borderRadius={12} width={"100%"} height={64} className="mb-[24px]" />
      <div className="mb-[48px] desktop:mb-[64px]">
        <div className="flex justify-between">
          <Skeleton borderRadius={8} width={110} height={24} />
          <Skeleton borderRadius={8} width={130} height={24} />
        </div>
        <Skeleton borderRadius={8} width={"100%"} height={40} className="mt-[16px]" />
        <Skeleton borderRadius={8} width={"100%"} height={40} className="mt-[16px]" />
        <Skeleton borderRadius={8} width={"100%"} height={40} className="mt-[16px]" />
      </div>
      <div className="mb-[48px] desktop:mb-[64px]">
        <Skeleton borderRadius={8} width={110} height={24} />
        <Skeleton
          borderRadius={8}
          width={"100%"}
          className="mt-[16px] h-[228px] desktop:h-[208px]"
        />
      </div>
      <div className="mb-[48px] desktop:mb-[64px]">
        <div className="flex justify-between">
          <Skeleton borderRadius={8} width={110} height={24} />
          <Skeleton borderRadius={8} width={130} height={24} />
        </div>
        <div className="mt-[16px] flex w-full justify-between">
          <Skeleton borderRadius={12} height={80} width={"30vw"} style={{ maxWidth: "380px" }} />
          <Skeleton borderRadius={12} height={80} width={"30vw"} style={{ maxWidth: "380px" }} />
          <Skeleton borderRadius={12} height={80} width={"30vw"} style={{ maxWidth: "380px" }} />
        </div>
      </div>
    </Container>
  );
}
