import getSSRHistory from "@/api/user/get-ssr-history";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Layout({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["history"],
    queryFn: getSSRHistory,
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
