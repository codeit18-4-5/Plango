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

  const { create: createComment, update: updateComment } = useTaskCommentsMutation();

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
          showToast("댓글이 등록 되었습니다.", "success");
        },
        onError: () => {
          showToast("댓글 등록에 실패하였습니다.", "error");
        },
      },
    );
  };

  const handleModifiedReplySubmit =
    (commentId: number) =>
    async (comment: string, onSuccess: () => void): Promise<void> => {
      if (groupId == null || taskListId == null || dateString == null) {
        showToast("댓글 수정 중 오류가 발생하였습니다.", "error");
        return;
      }

      try {
        updateComment.mutate(
          {
            groupId: Number(groupId),
            taskListId: Number(taskListId),
            dateString: dateString,
            taskId: taskDetail.id,
            commentId: commentId,
            comment: comment,
          },
          {
            onSuccess: () => {
              showToast("댓글이 수정 되었습니다.", "success");
              onSuccess();
            },
            onError: () => {
              showToast("댓글 수정에 실패하였습니다.", "error");
            },
          },
        );
      } catch (e) {
        console.error(e);
      }
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

        <div>
          <TaskCommentsField commentsData={commentsData} onSubmit={handleModifiedReplySubmit} />
        </div>
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

function TaskCommentsField({
  commentsData,
  onSubmit,
}: TaskCommentsProps & {
  onSubmit: (commentId: number) => (comment: string, onSuccess: () => void) => Promise<void>;
}) {
  const { user } = useAuthStore();
  const userId = user?.id ?? null;

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editError, setEditError] = useState<Record<number, string>>({});

  const handleCommentSaveClick = async (
    comment: string,
    commentId: number,
    originalComment: string,
  ) => {
    const validation = taskCommentsSchema.safeParse({ content: comment });
    if (originalComment.trim() === comment.trim()) {
      setEditingCommentId(null);
      return;
    }
    if (!validation.success) {
      setEditError({ [commentId]: validation.error.issues[0].message });
      return;
    }

    const submit = onSubmit(commentId);
    await submit(comment, () => {
      setEditError({});
      setEditingCommentId(null);
    });
  };

  return (
    <>
      {commentsData &&
        commentsData.map(comment => (
          <div key={comment.id} className="relative pt-[10px]">
            <Reply
              key={`${comment.id}=${editingCommentId === comment.id}`}
              comment={comment}
              isAuthor={userId === comment.user.id}
              isEditing={editingCommentId === comment.id}
              onCancelEdit={() => {
                setEditingCommentId(null);
                setEditError({});
              }}
              onSaveEdit={value => handleCommentSaveClick(value, comment.id, comment.content)}
              actions={[
                {
                  label: "수정하기",
                  onClick: () => {
                    setEditingCommentId(comment.id);
                    setEditError({});
                  },
                },
                {
                  label: "삭제하기",
                  onClick: () => {},
                },
              ]}
              variant="secondary"
            />
            {editError && editError[comment.id] && (
              <p className="absolute bottom-[23px] text-body-s text-pink-500">
                {editError[comment.id]}
              </p>
            )}
          </div>
        ))}
    </>
  );
}
