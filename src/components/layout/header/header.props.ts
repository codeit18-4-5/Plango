type userOption = {
  url: string;
  menuName: string;
};

export const userOptions: userOption[] = [
  { url: "/my/history", menuName: "마이 히스토리" },
  { url: "/my", menuName: "계정관리" },
  { url: "/team/join", menuName: "팀참여하기" },
  { url: "/team/create", menuName: "팀생성하기" },
];
