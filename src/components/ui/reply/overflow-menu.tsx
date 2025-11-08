"use client";

import { useRef } from "react";
import { useToggle, useClickOutside } from "@/hooks";
import { Button } from "@/components/ui";
import IcKebab from "@/assets/icons/ic-kebab.svg";

type OverflowMenuProps = {
  onEdit: () => void;
};

export default function OverflowMenu({ onEdit }: OverflowMenuProps) {
  const menuWrapperRef = useRef<HTMLDivElement>(null);
  const { isOn: isMenuOpen, toggle: toggleMenu, setOff: closeMenu } = useToggle(false);

  useClickOutside(menuWrapperRef, closeMenu);

  return (
    <div ref={menuWrapperRef} className="z-5 absolute right-0 top-0">
      <Button
        shape="basic"
        intent="primary"
        size="icon"
        aria-label="댓글 관리 메뉴"
        onClick={toggleMenu}
      >
        <IcKebab className="h-4 w-4 text-gray-500" />
      </Button>
      {isMenuOpen && (
        <div onClick={closeMenu} className="absolute right-0 top-full">
          {/* 추후 드롭다운 컴포넌트로 대체 */}
          <Button onClick={onEdit} intent="tertiary">
            수정하기
          </Button>
        </div>
      )}
    </div>
  );
}
