import IcGear from "@/assets/icons/ic-setting.svg";
import { Dropdown } from "@/components/ui";
import { teamTitleProps } from "@/types/group";
import { teamTitleStyle } from "./team.styles";

export default function TeamTitle({ name, id }: teamTitleProps) {
  return (
    <section className={teamTitleStyle}>
      <h2 className="z-10 text-xl font-bold">{name}</h2>
      <Dropdown intent="icon">
        <Dropdown.TriggerIcon>
          <IcGear className="h-6 w-6" />
        </Dropdown.TriggerIcon>
        <Dropdown.Menu size="md">
          <Dropdown.Option align="center" size="sm" as="a" href={`/team/${id}/edit`}>
            수정하기
          </Dropdown.Option>
          <Dropdown.Option align="center" size="sm">
            삭제하기
          </Dropdown.Option>
        </Dropdown.Menu>
      </Dropdown>
    </section>
  );
}
