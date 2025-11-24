"use client";
import { Container } from "@/components/layout";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import HistoryList from "@/components/features/my/history-list";
import { UserHistoryResponse } from "@/types/user";

const getHistory = async () => {
  const res = await axiosInstance.get(`/user/history`);
  return res.data;
};

export default function MyHistory() {
  const { data: historyItems } = useQuery<UserHistoryResponse>({
    queryKey: ["history"],
    queryFn: getHistory,
  });

  const historyDone = historyItems?.tasksDone ?? [];

  return (
    <Container className="full-scroll-h flex flex-col pb-6">
      <h2 className="text-heading-m font-bold tablet:text-heading-s">마이 히스토리</h2>
      {historyDone?.length === 0 ? (
        <div className="flex-1 content-center text-center">
          <p className="text-sm text-gray-500">아직 히스토리가 없습니다.</p>
        </div>
      ) : (
        <HistoryList tasksDone={historyDone} />
      )}
    </Container>
  );
}
