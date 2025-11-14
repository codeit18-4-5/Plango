import { UserSummary } from "./user";

/**
 * Comment base 관련 타입
 * 자유 게시판, Task 등 공통으로 사용하는 댓글 기본 속성을 정의합니다.
 * @author yeonsu
 * @description 작성자를 writer로 표시하는 데이터의 경우에는 writer를 user로 매핑해주세요.
 */

export interface CommentBase {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: UserSummary;
}
