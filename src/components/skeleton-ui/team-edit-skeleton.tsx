import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Container } from "../layout";

export default function TeamEditSkeleton() {
  return (
    <Container className="mt-[72px] max-w-[460px] pt-0 tablet:mt-[100px] tablet:px-0 desktop:mt-[140px] desktop:pt-0">
      <div className="mb-[24px] text-center tablet:mb-[80px]">
        <Skeleton height={36} width={140} />
      </div>

      <Skeleton height={20} width={64} className="mb-[12px]" />
      <Skeleton circle={true} height={64} width={64} className="mb-[22px]" />

      <Skeleton height={20} width={64} className="mb-[12px]" />
      <Skeleton height={46} width={"100%"} borderRadius={12} className="mb-[35px]" />
      <Skeleton height={46} width={"100%"} borderRadius={12} className="mb-[24px]" />
      <div className="text-center">
        <Skeleton height={24} width={380} borderRadius={12} className="mb-[24px]" />
      </div>
    </Container>
  );
}
