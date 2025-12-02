import { Avatar, Dropdown } from "@/components/ui";
import { userOptions } from "../header.props";
import { User } from "@/types/user";
import { useLogout } from "@/hooks";

export function UserDropdown({ user }: { user: User }) {
  const logout = useLogout();

  return (
    <Dropdown>
      <Dropdown.TriggerIcon>
        <Avatar
          image={user.image}
          shape="basic"
          className="h-[26px] w-[26px] border border-gray-400"
        />
        <span className="hidden tablet:inline tablet:pl-[8px]">{user.nickname}</span>
      </Dropdown.TriggerIcon>
      <Dropdown.Menu size="md">
        {userOptions.map(option => {
          return (
            <Dropdown.Option
              size="md"
              align="center"
              as="a"
              href={option.url}
              key={option.url}
              className="px-2"
            >
              {option.menuName}
            </Dropdown.Option>
          );
        })}
        <Dropdown.Option size="md" align="center" onClick={() => logout()}>
          로그아웃
        </Dropdown.Option>
      </Dropdown.Menu>
    </Dropdown>
  );
}
