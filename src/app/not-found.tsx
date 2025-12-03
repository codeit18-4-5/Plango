import Image from "next/image";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui";
import { Header } from "@/components/layout";
import ButtonNotFound from "@/components/features/not-found/button-404";

export default function NotFound() {
  return (
    <>
      <Header isLoginPage={true} />
      <Container className="mt-[15vh] tablet:mt-[20vh]">
        <Image
          src="/assets/images/img-404.svg"
          alt=""
          width={300}
          height={60}
          className="mx-auto"
        />
        <p className="mt-[32px] text-center text-gray-500 tablet:mt-[48px]">
          페이지를 찾을 수 없습니다.
        </p>
        <div className="mx-auto mt-[48px] flex w-[350px] items-center gap-2 tablet:mt-[80px]">
          <ButtonNotFound />
          <Button intent="primary" className="h-[48px] w-[180px]" as="a" href="/">
            홈으로 이동
          </Button>
        </div>
      </Container>
    </>
  );
}
