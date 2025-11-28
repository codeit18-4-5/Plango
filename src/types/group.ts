import { TaskList, Member } from "./tasklist";

export type GroupCreateRequest = {
  name: string;
  image?: string;
};

export type GroupCreateResponse = {
  name: string;
  image: string;
  updatedAt: string;
  createdAt: string;
  id: number;
};

export type GetGroupsResponse = {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
  members: Member[];
  taskLists: TaskList[];
};

export type teamTitleProps = {
  name: string | undefined;
  id: number | undefined;
};

export type TodoListProps = {
  groupId: number;
  taskList: TaskList[];
};
