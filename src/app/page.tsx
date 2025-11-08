import { Reply, ReplyInput } from "@/components/ui";
import { ArticleComment } from "@/types/article-comment";

const mockComments: ArticleComment[] = [
  {
    id: 1,
    writer: {
      id: 1,
      image: "/assets/images/img-test.jpeg",
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
      image: "fdf",
      nickname: "리스트 참깨",
    },
    content: "variant: secondary",
    createdAt: "2025-11-08T08:15:00.000Z",
    updatedAt: "2025-11-08T08:45:00.000Z",
  },
  {
    id: 3,
    writer: {
      id: 3,
      image: "/assets/images/img-test.jpeg",
      nickname: "리스트 참깨",
    },
    content: "variant: secondary",
    createdAt: "2025-11-08T08:15:00.000Z",
    updatedAt: "2025-11-08T08:45:00.000Z",
  },
];

export default function Home() {
  return (
    <div className="grid gap-y-6">
      <ReplyInput />
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
    </div>
  );
}
