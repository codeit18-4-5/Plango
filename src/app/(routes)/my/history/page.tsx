"use client";

import { useQuery } from "@tanstack/react-query";
import HistoryList, { HistoryEmpty } from "@/components/features/my/history-list";
import { UserHistoryResponse } from "@/types/user";
import getHistory from "@/api/user/get-history";
import { Button } from "@/components/ui";
import HistoryListSkeleton from "@/components/skeleton-ui/history-list-skeleton";

export default function MyHistory() {
  const {
    data: historyItems,
    isPending,
    isError,
    refetch,
  } = useQuery<UserHistoryResponse>({
    queryKey: ["history"],
    queryFn: getHistory,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
  const historyDone = historyItems?.tasksDone ?? [];

  if (isPending) return <HistoryListSkeleton />;

  if (isError) {
    return (
      <HistoryEmpty msg="히스토리를 불러오지 못했습니다.">
        <Button className="mt-4" size="md" onClick={() => refetch()}>
          다시 시도
        </Button>
      </HistoryEmpty>
    );
  }

  if (historyDone?.length === 0) return <HistoryEmpty msg="아직 히스토리가 없습니다." />;

  return <HistoryList tasksDone={historyDone} />;
}
