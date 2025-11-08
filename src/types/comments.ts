import { UserSummary } from "@/types/user";

/**
 * Comment(task) 관련 타입 정의
 * @author yeonsu
 */

export interface Comment {
  id: number;
  content: string;
  userId: number;
  taskId: number;
  createdAt: string;
  updatedAt: string;
  user: UserSummary;
}
