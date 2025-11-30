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

export type GetUserGroup = Omit<GetGroupsResponse, "members" | "taskLists">;

export type teamTitleProps = {
  name: string;
  id: number;
  userRole: string;
};

export type TodoListProps = {
  groupId: number;
  taskList: TaskList[];
};

export type GroupJoinRequest = {
  userEmail: string;
  token: string;
};
