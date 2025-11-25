import IcGear from "@/assets/icons/ic-setting.svg";
import { Dropdown } from "@/components/ui";

export default function TeamTitle() {
  return (
    <section className="relative mb-[24px] flex h-[64px] w-full items-center justify-between rounded-[12px] bg-gray-600 bg-[url('/assets/images/img-thumbnail-team.svg')] bg-[bottom_right_80px] bg-no-repeat px-[24px]">
      <h2 className="z-10 text-xl font-bold">팀 이름</h2>
      <Dropdown intent="icon">
        <Dropdown.TriggerIcon>
          <IcGear className="h-6 w-6" />
        </Dropdown.TriggerIcon>
        <Dropdown.Menu size="md">
          <Dropdown.Option align="center" size="sm">
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
