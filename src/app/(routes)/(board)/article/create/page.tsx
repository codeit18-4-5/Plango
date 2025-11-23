"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postImagesUpload from "@/api/image/post-images-upload";
import postArticle from "@/api/article/post-article";
import { articleFormSchema, ArticleFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateArticleData } from "@/types/article";
import { Container } from "@/components/layout";
import { ArticleFormFields } from "@/components/features/article";
import { Form } from "@/components/ui";
import {
  ARTICLE_COMMON_STYLES,
  ARTICLE_FORM_STYLES,
} from "@/components/features/article/index.styles";

export default function CreateArticlesPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  // TODO: isSuccess, isError, error 처리는 추후 토스트로 처리 예정
  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: async (data: ArticleFormSchema) => {
      let imageUrl: string | undefined;

      if (selectedFile) {
        try {
          const { url } = await postImagesUpload({ url: selectedFile });
          imageUrl = url;
        } catch {
          imageUrl = undefined;
        }
      }

      const postBody: CreateArticleData = {
        title: data.title,
        content: data.content,
        ...(imageUrl && { image: imageUrl }),
      };
      return postArticle(postBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getArticles"] });
    },
  });

  const handleImageChange = (fileOrUrl: File | string | null) => {
    setSelectedFile(fileOrUrl instanceof File ? fileOrUrl : null);
  };

  const handleSubmit = (data: ArticleFormSchema) => {
    mutate(data);
  };

  return (
    <Container as="main" className={ARTICLE_COMMON_STYLES.main.wrapper}>
      <h2 className="visually-hidden">자유게시판</h2>
      <Form<ArticleFormSchema>
        onSubmit={handleSubmit}
        resolver={zodResolver(articleFormSchema)}
        mode="onBlur"
        reValidateMode="onBlur"
        className={ARTICLE_FORM_STYLES.form.wrapper}
      >
        <ArticleFormFields
          type="create"
          onImageChange={handleImageChange}
          isMutating={isMutating}
        />
      </Form>
    </Container>
  );
}
