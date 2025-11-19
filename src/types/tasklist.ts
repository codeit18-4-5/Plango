import { Task } from "./task";

/** tasklist 페이지 메인정보
 * @author luli
 */

export type Tasklist = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: Task[];
};
