"use client";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function ButtonNotFound() {
  const router = useRouter();

  return (
    <Button intent="tertiary" className="h-[48px] w-[180px]" onClick={() => router.back()}>
      이전 페이지로
    </Button>
  );
}
