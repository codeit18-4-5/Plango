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

export type UserUpdate = Partial<Pick<User, "image" | "nickname">>;

export type UserPassword = {
  passwordConfirmation: string;
  password: string;
};

export type UserResetPassword = {
  token: string;
} & UserPassword;

export type UserSendResetPasswordEmail = {
  email: string;
  redirectUrl: string;
};

export type UserHistory = {
  id: number;
  updatedAt: string;
  date: string;
  doneAt: string;
  recurringId: number;
  name: string;
  description: string;
  frequency: string;
  deletedAt: string | null;
  userId: number;
  writerId: number;
  displayIndex: number;
};

export type UserHistoryResponse = {
  tasksDone: UserHistory[];
};
