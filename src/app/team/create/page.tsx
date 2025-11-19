"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button, Input } from "@/components/ui";
import { GroupCreateRequest } from "@/types/group";
import postImage from "@/api/images";
import postGroups from "@/api/team/post-gruops";
import IcProfile from "@/assets/icons/ic-image-circle.svg";
import IcEdit from "@/assets/icons/ic-pencil-border.svg";

export default function TeamCreatePage() {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [formData, setFormData] = useState<GroupCreateRequest>({
    name: "",
    url: "",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = e => {
        setFormData(prev => ({ ...prev, url: e.target?.result as string }));
      };
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    setFormData(prev => ({ ...prev, name: inputName }));
  };

  const uploadImageMutate = useMutation({
    mutationFn: postImage,
    onSuccess: res => {
      const imageUrl = res as string;

      createGroupMutate.mutate({
        ...formData,
        url: imageUrl,
      });
    },
    onError: error => console.log(error.message),
  });

  const createGroupMutate = useMutation({
    mutationFn: postGroups,
    onSuccess: res => {
      router.replace(`/team/${res.id}`);
    },
    onError: error => console.log(error.message),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    uploadImageMutate.mutate(formData.url);
  };
  return (
    <div className="mx-auto mt-[72px] h-[460px] w-[343px] tablet:mt-[100px] tablet:w-[460px] desktop:mt-[140px]">
      <h2 className="mb-[24px] w-full text-center text-[24px] tablet:mb-[80px]">팀 생성하기</h2>
      <form method="POST" className="w-full" onSubmit={handleSubmit}>
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
            {formData.url ? (
              <img
                src={formData.url}
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
            onChange={handleNameChange}
          />
        </Input>
        <Button as="button" type="submit" className="mb-[24px] h-[47px] w-full">
          생성하기
        </Button>
      </form>
      <p className="w-full text-center text-[14px] tablet:text-[16px]">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </p>
    </div>
  );
}
