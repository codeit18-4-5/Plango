import getSSRHistory from "@/api/user/get-ssr-history";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Layout({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["history"],
      queryFn: getSSRHistory,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
