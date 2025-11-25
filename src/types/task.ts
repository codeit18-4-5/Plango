import { UserSummary } from "./user";

/** tasklist 메인의 task, task 상세정보용 task
 * @author luli
 */
export interface TaskCommonProps {
  groupId: number;
  taskListId: number;
}

export interface TaskListProps extends TaskCommonProps {
  date: string;
  dateString?: string;
}

export interface TaskDetailProps extends TaskCommonProps {
  taskId: number;
}

export type TaskCommonValue = {
  id: number;
  name: string;
  description: string | null;
};

// tasklist 메인용 task
export type Task = TaskCommonValue & {
  date: string;
  doneAt: string | null;
  updatedAt: string;
  user: null;
  recurringId: number;
  deletedAt: string | null;
  displayIndex: number;
  writer: UserSummary;
  doneBy: {
    user: UserSummary | null;
  };
  commentCount: number;
  frequency: string;
};

// task 상세정보
export type TaskDetail = Task & {
  recurring: RecurringType;
};

type RecurringCommon = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  frequencyType: string;
  taskListId: number;
  groupId: number;
  writerId: number;
};

export type RecurringType = RecurringCommon & {
  description: string | null;
  weekDays: number[];
  monthDay: number;
};

export type RecurringPostType = RecurringCommon & {
  description: string;
  weekDays?: number[];
  monthDay?: number;
};
