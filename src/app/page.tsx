import { Reply } from "@/components/ui";
import { ArticleComment } from "@/types/article-comment";

const mockComments: ArticleComment[] = [
  {
    id: 1,
    writer: {
      id: 1,
      image: "123",
      nickname: "자유게시판 참깨",
    },
    content: "ㄷㄷㄷ\nㅅㅅㅅ\nㅇㅇㅇ\nㅇㅇ\nㄴㅌ",
    createdAt: "2025-11-08T09:30:00.000Z",
    updatedAt: "2025-11-08T09:30:00.000Z",
  },
  {
    id: 2,
    writer: {
      id: 2,
      image: "",
      nickname: "리스트 참깨",
    },
    content: "variant: secondary",
    createdAt: "2025-11-08T08:15:00.000Z",
    updatedAt: "2025-11-08T08:45:00.000Z",
  },
];

export default function Home() {
  return (
    <ul className="grid gap-y-4">
      {mockComments.map(comment => (
        <li key={comment.id}>
          <Reply
            comment={comment}
            variant={comment.content === "variant: secondary" ? "secondary" : "primary"}
          />
        </li>
      ))}
    </ul>
  );
}
