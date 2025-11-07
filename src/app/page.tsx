import { Reply } from "@/components/ui";
const mockComment = {
  user: {
    image: "dd",
    nickname: "참깨",
    id: 0,
  },
  userId: 0,
  taskId: 0,
  updatedAt: "2025-11-07T18:12:43.254Z",
  createdAt: "2025-11-07T18:12:43.254Z",
  content: "댓글 내용",
  id: 0,
};
export default function Home() {
  return (
    <div>
      <Reply comment={mockComment} />
    </div>
  );
}
