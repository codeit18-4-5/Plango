/**
 * comments 관련 타입 정의
 * @author yeonsu
 */

export interface User {
  id: number;
  image: string;
  nickname: string;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  createdAt: string;
  updatedAt: string;
}
