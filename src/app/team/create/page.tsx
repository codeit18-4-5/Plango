"use client";
import { useState, useRef } from "react";
import { Button, Input } from "@/components/ui";
import IcProfile from "@/assets/icons/ic-image-circle.svg";
import IcEdit from "@/assets/icons/ic-pencil-border.svg";

export default function TeamCreatePage() {
  const ref = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = e => {
        setSelectedImage(e.target?.result as string);
      };
    }
  };
  return (
    <div className="mx-auto mt-[72px] h-[460px] min-w-[343px] max-w-[460px] tablet:mt-[100px] desktop:mt-[140px]">
      <h2 className="mb-[24px] w-full text-center text-[24px] tablet:mb-[80px]">팀 생성하기</h2>
      <form method="POST" className="w-full">
        <section className="relative mb-[24px] block w-[64px]">
          <p className="mb-[12px] block">팀 프로필</p>
          <label className="cursor-pointer" htmlFor="teamProfile">
            <input
              id="teamProfile"
              type="file"
              accept="image/*"
              className="hidden"
              ref={ref}
              onChange={handleImageChange}
            />
            {selectedImage ? (
              <img
                src={selectedImage}
                className="inline-block h-[64px] w-full rounded-full border-[2px] border-line-strong"
              />
            ) : (
              <IcProfile className="h-[64px] w-full" />
            )}

            <IcEdit className="absolute bottom-0 right-0 h-[20px] w-[20px]" />
          </label>
        </section>

        <Input id="teamName">
          <Input.Label label="팀 이름" />
          <Input.Field
            type="text"
            className="mb-[40px] h-[48px]"
            placeholder="팀 이름을 입력해주세요."
          />
        </Input>
        <Button as="button" type="submit" className="mb-[24px] h-[47px] w-full">
          생성하기
        </Button>
      </form>
      <p className="w-full text-center">팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.</p>
    </div>
  );
}
