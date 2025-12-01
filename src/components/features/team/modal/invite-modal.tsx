import { Modal } from "@/components/ui";
import getInviteToeken from "@/api/team/get-invite-token";
import { useQuery } from "@tanstack/react-query";
import { TeamModalProps } from "../team.props";
import { useToast } from "@/providers/toast-provider";
import { devConsoleError } from "@/lib/error";

export const InviteModal = ({ isOpen, groupId, onClose }: TeamModalProps) => {
  const { showToast } = useToast();

  const { data, refetch } = useQuery({
    queryKey: ["getInviteToken", groupId],
    queryFn: () => getInviteToeken(groupId),
  });

  const copyToClipboard = async (text: string) => {
    try {
      console.log(text);
      await navigator.clipboard.writeText(text);
      showToast("클립보드에 복사되었습니다.", "success");
      onClose();
    } catch (err) {
      showToast("클립보드 복사 실패:", "error");
      devConsoleError(err);
    }
  };

  const handleGetToken = () => {
    refetch();
    copyToClipboard(data);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.HeaderWithClose title="멤버 초대" />
      <Modal.Body>
        <p className="mb-6 text-center text-sm text-gray-300">
          팀에 참여할 수 있는 링크를 복사합니다.
        </p>
      </Modal.Body>
      <Modal.FooterWithOnlyConfirm confirmButtonTitle="링크 복사하기" onConfirm={handleGetToken} />
    </Modal>
  );
};
