import { useFormContext } from "react-hook-form";
import { CreateArticleSchema } from "@/lib/schema";
import { ArticleField, CreateSectionHeader } from "@/components/features/article/layout";
import { Input, ImgUpload, Button } from "@/components/ui";
import { FILE_POLICY } from "@/constants/file_policy";

export default function ArticleFormFields() {
  const {
    register,
    control,
    formState: { errors, isValid },
  } = useFormContext<CreateArticleSchema>();

  return (
    <>
      <CreateSectionHeader title="게시글 쓰기" as="h3">
        <Button type="submit" disabled={!isValid}>
          등록
        </Button>
      </CreateSectionHeader>
      <ArticleField id="title" label="제목" required={true} errorMsg={errors.title?.message}>
        <Input.Field
          placeholder="제목을 입력해주세요."
          {...register("title")}
          className="bg-gray-800"
        />
      </ArticleField>
      <ArticleField id="content" label="내용" required={true} errorMsg={errors.content?.message}>
        <Input.Field
          as="textarea"
          placeholder="내용을 입력해주세요."
          {...register("content")}
          className="bg-gray-800"
        />
      </ArticleField>
      <ArticleField
        id="image"
        label="이미지"
        caption={`이미지 파일 최대 용량은 ${FILE_POLICY.MAX_IMAGE_SIZE_MB}MB입니다.`}
      >
        <ImgUpload control={control} name="image" id="image" />
      </ArticleField>
    </>
  );
}
