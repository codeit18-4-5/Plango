import { DropdownOption } from "@/types/option";

type userOption = {
  url: string;
  menuName: string;
};

export const userOptions: userOption[] = [
  { url: "", menuName: "마이페이지" },
  { url: "", menuName: "계정관리" },
  { url: "", menuName: "팀참여하기" },
  { url: "", menuName: "팀생성하기" },
  { url: "", menuName: "로그아웃" },
];

//group mockup data
export const groups: DropdownOption[] = [
  {
    id: 1,
    name: "test1",
    image: "",
  },
  {
    id: 2,
    name: "test2",
    image: "",
  },
];
