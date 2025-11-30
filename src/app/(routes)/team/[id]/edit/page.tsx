"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import _ from "lodash";
import { useRouter, useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input } from "@/components/ui";
import { Container } from "@/components/layout";
import { GroupUpdateRequest, GetGroupsResponse, GroupUpdateBody } from "@/types/group";
import getGroups from "@/api/team/get-groups";
import postImagesUpload from "@/api/image/post-images-upload";
import patchGroups from "@/api/team/patch-groups";
import IcProfile from "@/assets/icons/ic-image-circle.svg";
import IcEdit from "@/assets/icons/ic-pencil-border.svg";
import { devConsoleError } from "@/lib/error";
import { useToast } from "@/providers/toast-provider";

export default function TeamEditPagae() {
  const param = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const groupId = Number(param.id);

  const { isPending, data } = useQuery<GetGroupsResponse, Error>({
    queryKey: ["getGroups", groupId],
    queryFn: () => getGroups(groupId),
  });

  const [formData, setFormData] = useState<GroupUpdateBody>({});
  const [selectedImgFile, setSelectedImgFile] = useState<File | null | undefined>();

  useEffect(() => {
    setFormData({
      name: data?.name,
      image: data?.image,
    });
  }, [data]);

  const uploadImageMutate = useMutation({
    mutationFn: postImagesUpload,
    onSuccess: res => {
      const imageUrl = res.url as string;
      const newData: GroupUpdateBody = {};
      newData.name = formData.name;
      newData.image = imageUrl;

      updateGroupMutate.mutate({ groupId: groupId, payload: newData });
    },
    onError: error => {
      devConsoleError(error);
      showToast("이미지 업로드에 문제가 생겼습니다.", "error");
    },
  });

  const updateGroupMutate = useMutation({
    mutationFn: async ({ groupId, payload }: GroupUpdateRequest) => {
      await patchGroups(groupId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getGroups", groupId],
      });
      sessionStorage.setItem("teamEditMessage", "팀이 수정되었습니다.");
      router.replace(`/team/${groupId}`);
    },
    onError: error => {
      devConsoleError(error);
      showToast("팀 수정에 문제가 생겼습니다.", "error");
    },
  });

  if (!data) return null;
  if (isPending) return <div>로딩중입니다</div>;

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

  const handleFormValidate = (form: GroupUpdateBody) => {
    if (!form.name) {
      alert("이름은 공란일 수 없습니다");
      return;
    }

    const newData: GroupUpdateBody = {};
    if (data.name !== form.name) {
      newData.name = form.name;
    }
    if (data.image !== form.image) {
      newData.image = form.image;
    }

    if (_.isEmpty(newData)) {
      alert("수정된 내용이 없습니다.");
      return;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleFormValidate(formData);

    if (selectedImgFile) {
      uploadImageMutate.mutate({ url: selectedImgFile });
    } else {
      updateGroupMutate.mutate({ groupId, payload: formData });
    }
  };

  return (
    <Container className="mt-[72px] max-w-[460px] pt-0 tablet:mt-[100px] tablet:px-0 desktop:mt-[140px] desktop:pt-0">
      <h2 className="mb-[24px] w-full text-center text-[24px] tablet:mb-[80px]">팀 수정하기</h2>
      <form method="PATCH" className="w-full" onSubmit={handleSubmit}>
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
          <Input.Label label="팀 이름" />
          <Input.Field
            type="text"
            className="mb-[40px] h-[48px]"
            placeholder="팀 이름을 입력해주세요."
            onChange={handleNameChange}
            value={formData.name || ""}
          />
        </Input>
        <Button
          as="button"
          type="submit"
          className="mb-[24px] h-[47px] w-full"
          disabled={updateGroupMutate.isPending || uploadImageMutate.isPending}
        >
          수정하기
        </Button>
      </form>
      <p className="w-full text-center text-[14px] tablet:text-[16px]">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </p>
    </Container>
  );
}
