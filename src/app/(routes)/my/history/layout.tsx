import getSSRHistory from "@/api/user/get-ssr-history";
import { Container } from "@/components/layout";
import { devConsoleError } from "@/lib/error";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Layout({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["history"],
      queryFn: getSSRHistory,
    });
  } catch (error) {
    devConsoleError(error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container className="full-scroll-h flex flex-col pb-6">
        <h2 className="text-heading-m font-bold tablet:text-heading-s">마이 히스토리</h2>
        {children}
      </Container>
    </HydrationBoundary>
  );
}
