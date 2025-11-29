import { Member } from "@/types/tasklist";
import MemberCard from "./member-card";
import { useToggle } from "@/hooks";
import { InviteModal } from "./modal/invite-modal";

type TeamMemberProps = {
  members: Member[];
  userId: number;
  userRole: string;
  groupId: number;
};

export default function TeamMember({ members, userId, userRole, groupId }: TeamMemberProps) {
  const { isOpen, setOpen, setClose } = useToggle();

  return (
    <section className="mb-[48px] desktop:mb-[64px]">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <h3 className="inline-block text-[16px]">멤버</h3>
          <span className="text-[16px] text-gray-500">({members.length}명)</span>
        </div>
        <button className="text-sm text-pink-400" onClick={setOpen}>
          + 새로운 멤버 초대하기
        </button>
      </div>
      <div className="mt-[16px] grid w-full grid-cols-2 gap-[16px] tablet:grid-cols-3 tablet:gap-[24px]">
        {members.map(mb => (
          <MemberCard member={mb} userRole={userRole} userId={userId} key={mb.userId} />
        ))}
      </div>
      {isOpen && <InviteModal groupId={groupId} isOpen={isOpen} onClose={setClose} />}
    </section>
  );
}
