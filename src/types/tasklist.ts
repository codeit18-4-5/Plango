import { Task } from "./task";

/** tasklist 페이지 메인정보
 * @author luli
 */

type Member = {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: string;
};

export type GroupTaskList = {
  id: number;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  members: Member[];
  taskLists: TaskList[];
};

export type TaskList = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: Task[];
};
