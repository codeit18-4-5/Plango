import { useFormContext } from "react-hook-form";
import { CreateArticleSchema } from "@/lib/schema";
import { ArticleField, CreateSectionHeader } from "@/components/features/article/layout";
import { Input, ImgUpload, Button } from "@/components/ui";

export default function ArticleFormFields() {
  const {
    register,
    formState: { errors, isValid, isDirty },
  } = useFormContext<CreateArticleSchema>();
  return (
    <>
      <CreateSectionHeader title="게시글 쓰기" as="h3">
        <Button type="submit" disabled={!isValid && !isDirty}>
          등록
        </Button>
      </CreateSectionHeader>
      <ArticleField id="title" label="제목" required={true} errorMsg={errors.title?.message}>
        <Input.Field placeholder="제목을 입력해주세요." {...register("title")} />
      </ArticleField>
      <ArticleField id="content" label="내용" required={true} errorMsg={errors.content?.message}>
        <Input.Field as="textarea" placeholder="내용을 입력해주세요." {...register("content")} />
      </ArticleField>
      <ArticleField id="image" label="이미지" caption="최대 5MB의 이미지를 업로드할 수 있습니다.">
        <ImgUpload />
      </ArticleField>
    </>
  );
}
