"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button, Input } from "@/components/ui";
import { GroupCreateRequest } from "@/types/group";
import postImagesUpload from "@/api/image/post-images-upload";
import postGroups from "@/api/team/post-gruops";
import IcProfile from "@/assets/icons/ic-image-circle.svg";
import IcEdit from "@/assets/icons/ic-pencil-border.svg";
import { devConsoleError } from "@/lib/error";
import { useToast } from "@/providers/toast-provider";
import { useQueryClient } from "@tanstack/react-query";

export default function TeamCreatePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<GroupCreateRequest>({
    name: "",
  });

  const [selectedImgFile, setSelectedImgFile] = useState<File | null | undefined>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        formData.image = reader.result as string;
        setSelectedImgFile(file);
      };
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    setFormData(prev => ({ ...prev, name: inputName }));
  };

  const uploadImageMutate = useMutation({
    mutationFn: postImagesUpload,
    onSuccess: res => {
      const imageUrl = res.url as string;

      createGroupMutate.mutate({
        ...formData,
        image: imageUrl,
      });
    },
    onError: error => {
      devConsoleError(error);
      showToast("팀 생성에 문제가 생겼습니다.", "error");
    },
  });

  const createGroupMutate = useMutation({
    mutationFn: postGroups,
    onSuccess: res => {
      sessionStorage.setItem("teatCreateMessage", "팀이 생성되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      router.replace(`/team/${res.id}`);
    },
    onError: error => {
      devConsoleError(error);
      showToast("팀 생성에 문제가 생겼습니다.", "error");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedImgFile) {
      uploadImageMutate.mutate({ url: selectedImgFile });
    } else {
      createGroupMutate.mutate(formData);
    }
  };
  return (
    <div className="mx-auto mt-[72px] h-[460px] w-[343px] tablet:mt-[100px] tablet:w-[460px] desktop:mt-[140px]">
      <h2 className="mb-[24px] w-full text-center text-[24px] tablet:mb-[80px]">팀 생성하기</h2>
      <form method="POST" className="w-full" onSubmit={handleSubmit}>
        <section className="relative mb-[24px] w-[64px]">
          <p className="mb-[12px]">팀 프로필</p>
          <label className="cursor-pointer" htmlFor="teamProfile">
            <input
              id="teamProfile"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {formData.image ? (
              <Image
                src={formData.image}
                alt="팀 프로필 사진"
                className="inline-block h-[64px] w-full rounded-full border-[2px] border-line-strong"
                width={64}
                height={64}
              />
            ) : (
              <IcProfile className="h-[64px] w-full" />
            )}

            <IcEdit className="absolute bottom-0 right-0 h-[20px] w-[20px]" />
          </label>
        </section>

        <Input id="teamName">
          <Input.Label label="팀 이름" caption="(최대30자)" />
          <Input.Field
            type="text"
            className="mb-[40px] h-[48px]"
            placeholder="팀 이름을 입력해주세요."
            onChange={handleNameChange}
            maxLength={30}
          />
        </Input>
        <Button
          as="button"
          type="submit"
          className="mb-[24px] h-[47px] w-full"
          disabled={createGroupMutate.isPending || uploadImageMutate.isPending}
        >
          생성하기
        </Button>
      </form>
      <p className="w-full text-center text-[14px] tablet:text-[16px]">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </p>
    </div>
  );
}
