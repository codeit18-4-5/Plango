import cn from "@/lib/cn";
import { useFormContext, useController } from "react-hook-form";
import { ArticleFormSchema } from "@/lib/schema";
import { ArticleField, CreateSectionHeader } from "@/components/features/article/layout";
import { Input, ImgUpload, Button } from "@/components/ui";
import { FILE_POLICY } from "@/constants/file_policy";
import { ArticleFormFieldsProps } from "@/types/article";
import { ARTICLE_FORM_STYLES } from "@/components/features/article/index.styles";

export default function ArticleFormFields({ type = "create" }: ArticleFormFieldsProps) {
  const {
    register,
    control,
    formState: { errors, isValid },
  } = useFormContext<ArticleFormSchema>();

  const { fieldState: imageFieldState } = useController({
    name: "image",
    control,
  });

  const isEdit = type === "edit";

  return (
    <>
      <CreateSectionHeader
        title={isEdit ? "게시글 수정" : "게시글 쓰기"}
        as="h3"
        className={ARTICLE_FORM_STYLES.section.heading.wrapper}
      >
        <div className={ARTICLE_FORM_STYLES.section.heading.actions}>
          <Button
            type="submit"
            disabled={!isValid}
            full={true}
            className={ARTICLE_FORM_STYLES.section.heading.submit}
          >
            {isEdit ? "수정" : "등록"}
          </Button>
        </div>
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
          className={cn(ARTICLE_FORM_STYLES.form.field.textarea, "bg-gray-800")}
        />
      </ArticleField>
      <ArticleField
        id="image"
        label="이미지"
        caption={`이미지 파일 최대 용량은 ${FILE_POLICY.MAX_IMAGE_SIZE_MB}MB입니다.`}
        errorMsg={imageFieldState.error?.message}
      >
        <ImgUpload control={control} name="image" id="image" />
      </ArticleField>
    </>
  );
}
