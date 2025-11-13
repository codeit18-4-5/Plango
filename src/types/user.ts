/**
 * User 관련 타입 정의
 * @author yeonsu
 */

export type Role = "ADMIN" | "MEMBER";

export interface User {
  id: number;
  image: string | null;
  nickname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  memberships?: Membership[];
}

export interface Membership {
  group: {
    id: number;
    image: string;
    name: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
  };
  role: Role;
  userId: number;
  userImage: string;
  userName: string;
  userEmail: string;
  groupId: number;
}

export type UserSummary = Pick<User, "id" | "image" | "nickname">;
