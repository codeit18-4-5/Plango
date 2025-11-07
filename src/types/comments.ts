import { UserSummary } from "@/types/user";

/**
 * comments 관련 타입 정의
 * @author yeonsu
 */

export interface Comments {
  id: number;
  content: string;
  userId: number;
  taskId: number;
  createdAt: string;
  updatedAt: string;
  user: UserSummary;
}
