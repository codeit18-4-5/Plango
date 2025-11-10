import { Reply, ReplyInput } from "@/components/ui";

// 테스트용 더미 데이터
const mockComment = {
  id: 1,
  content: "이것은 테스트 댓글입니다.\n여러 줄로 작성된 댓글 내용입니다.",
  writer: {
    id: 1,
    nickname: "테스트 사용자",
    image: "/assets/images/img-test.jpeg",
  },
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
};

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="mb-6 text-2xl font-bold">Reply 컴포넌트 테스트</h1>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Reply 컴포넌트</h2>
        <Reply comment={mockComment} variant="primary" />
        <Reply comment={mockComment} variant="secondary" />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">ReplyInput 컴포넌트</h2>
        <ReplyInput comment={mockComment} />
        <ReplyInput comment={mockComment} variant="secondary" />
      </div>
    </div>
  );
}
