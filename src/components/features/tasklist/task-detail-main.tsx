import KebabIcon from "@/assets/icons/ic-kebab.svg";
import { Avatar, Dropdown, Form, Reply, ReplyInput } from "@/components/ui";
import { formatDateToFullStr, formatTimeToStr, getFrequencyLabel } from "@/lib/utils";
import CalendarIcon from "@/assets/icons/ic-calendar.svg";
import RepeatIcon from "@/assets/icons/ic-repeat.svg";
import TimeIcon from "@/assets/icons/ic-time.svg";
import { TaskDetail } from "@/types/task";
import { KebabType } from "./task";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import z4 from "zod/v4";
import { taskCommentsSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Comment } from "@/types/comments";
import { useAuthStore } from "@/store/auth.store";
import { useToast } from "@/providers/toast-provider";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTaskListContext } from "@/app/(routes)/team/[id]/tasklist/[taskListId]/tasklist-provider";
import { useTaskCommentsMutation } from "@/hooks/taskList/use-tasklist";

interface TaskDetailProps {
  taskDetail: TaskDetail;
  onKebabClick: (type: KebabType) => void;
}

interface TaskCommentsProps {
  commentsData: Comment[];
}

interface TaskDetailPageProps extends TaskDetailProps, TaskCommentsProps {}

export default function TaskDetailMain({
  commentsData,
  taskDetail,
  onKebabClick,
}: TaskDetailPageProps) {
  const { showToast } = useToast();
  const { id: groupId, taskListId } = useParams();
  const { dateString } = useTaskListContext();

  const { create: createComment } = useTaskCommentsMutation();

  const handleKebabClick = (type: KebabType) => {
    onKebabClick(type);
  };

  const handleNewReplySubmit: SubmitHandler<z4.infer<typeof taskCommentsSchema>> = comment => {
    if (groupId == null || taskListId == null || dateString == null) {
      showToast("댓글 등록 중 오류가 발생하였습니다.", "error");
      return;
    }
    createComment.mutate(
      {
        groupId: Number(groupId),
        taskListId: Number(taskListId),
        dateString: dateString,
        taskId: taskDetail.id,
        comment: comment.content,
      },
      {
        onSuccess: () => {
          showToast("댓글이 등록되었습니다.", "success");
        },
        onError: () => {
          showToast("댓글 등록에 실패하였습니다.", "error");
        },
      },
    );
  };

  function ResetAfterSubmit() {
    const { reset, formState } = useFormContext();

    useEffect(() => {
      if (formState.isSubmitSuccessful) {
        reset({ content: "" });
      }
    }, [formState.isSubmitSuccessful, reset]);

    return null;
  }

  return (
    <>
      <section>
        <div className="mb-[16px] flex justify-between">
          <h1 className="text-heading-s text-gray-100">{taskDetail.name}</h1>
          <Dropdown>
            <Dropdown.TriggerIcon
              intent="icon"
              className="rounded px-[2px] py-[3px] hover:bg-gray-700"
            >
              <KebabIcon className="w-[24px]" />
            </Dropdown.TriggerIcon>
            <Dropdown.Menu size="md">
              <Dropdown.Option align="center" onClick={() => handleKebabClick("update")}>
                수정하기
              </Dropdown.Option>
              <Dropdown.Option align="center" onClick={() => handleKebabClick("delete")}>
                삭제하기
              </Dropdown.Option>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="mb-[16px] flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <Avatar className="w-[32px]" image={taskDetail.writer.image} />
            <span className="text-body-s text-gray-100">{taskDetail.writer.nickname}</span>
          </div>
          <span className="text-body-s text-gray-300">
            {formatDateToFullStr({ date: taskDetail.date, type: "korean" })}
          </span>
        </div>
        <div className="mb-[24px] flex gap-[10px]">
          <div className="flex gap-[7px]">
            <div className="w-[16px]">
              <CalendarIcon />
            </div>
            <span className="text-body-xs text-gray-500">
              {formatDateToFullStr({ date: taskDetail.date, type: "korean" })}
            </span>
          </div>
          <span className="text-body-xs text-gray-500">|</span>
          <div className="flex gap-[7px]">
            <div className="w-[16px]">
              <TimeIcon fill="var(--gray-500)" />
            </div>
            <span className="text-body-xs text-gray-500">
              {formatTimeToStr({ date: taskDetail.date, type: "meridiem" })}
            </span>
          </div>
          <span className="text-body-xs text-gray-500">|</span>
          <div className="flex gap-[7px]">
            {taskDetail?.frequency !== "ONCE" && (
              <div className="w-[16px]">
                <RepeatIcon />
              </div>
            )}
            <span className="text-body-xs text-gray-500">
              {getFrequencyLabel(taskDetail.frequency)}
            </span>
          </div>
        </div>
        <div className="h-[230px]">{taskDetail.description && <p>{taskDetail.description}</p>}</div>
      </section>
      <section>
        <Form
          onSubmit={handleNewReplySubmit}
          defaultValues={{ content: "" }}
          resolver={zodResolver(taskCommentsSchema)}
          mode="onSubmit"
        >
          <ResetAfterSubmit />
          <MyCommentField />
        </Form>
        <Form className="mt-6 shrink-0">
          <TaskCommentsField commentsData={commentsData} />
        </Form>
      </section>
    </>
  );
}

function MyCommentField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<z4.infer<typeof taskCommentsSchema>>();

  return (
    <div className="relative">
      <p className="absolute top-[-20px] text-body-s text-pink-500">
        {errors.content && errors.content.message}
      </p>
      <div>
        <Controller
          name="content"
          control={control}
          render={({ field }) => <ReplyInput variant="secondary" {...field} />}
        />
      </div>
    </div>
  );
}

function TaskCommentsField({ commentsData }: TaskCommentsProps) {
  const { user } = useAuthStore();
  const userId = user?.id ?? null;

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  return (
    <>
      {commentsData &&
        commentsData.map(comment => (
          <Reply
            key={comment.id}
            comment={comment}
            isAuthor={userId === comment.user.id}
            isEditing={editingCommentId === comment.id}
            onCancelEdit={() => setEditingCommentId(null)}
            onSaveEdit={() => setEditingCommentId(null)}
            actions={[
              {
                label: "수정하기",
                onClick: () => setEditingCommentId(comment.id),
              },
              {
                label: "삭제하기",
                onClick: () => {},
              },
            ]}
            variant="secondary"
          />
        ))}
    </>
  );
}
