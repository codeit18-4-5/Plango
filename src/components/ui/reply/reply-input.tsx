"use client";

import cn from "@/lib/cn";
import { CreateArticleComment } from "@/types/article-comment";
import { replyWrapper, replyTextarea } from "./index.styles";
import { Button } from "@/components/ui";

type ReplyProps = {
  comment: CreateArticleComment;
  variant?: "primary" | "secondary";
};

export default function Reply({ variant = "primary" }: ReplyProps) {
  return (
    <div className={replyWrapper({ variant })}>
      <textarea
        className={cn("max-h-[18.75rem]", replyTextarea({ variant }))}
        id={`comment`}
        placeholder="댓글을 입력해주세요"
      />
      <div className="flex justify-end gap-2">
        <Button size="lg">등록</Button>
      </div>
    </div>
  );
}
