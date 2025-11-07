//import cn from "@/lib/cn";
import { Comments } from "@/types/comments";
import { Avatar } from "@/components/ui";
import { getTimeAgo } from "@/lib/utils";

type ReplyProps = {
  comment: Comments;
};

export default function Reply({ comment }: ReplyProps) {
  const UserImageUrl = comment.user.image;

  return (
    <div>
      <p>{comment.content}</p>
      <div>
        <Avatar image={UserImageUrl} />
        <span>{comment.user.nickname}</span>
      </div>
      <span>{getTimeAgo(comment.createdAt)}</span>
    </div>
  );
}
