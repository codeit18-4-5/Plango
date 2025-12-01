"use client";

import cn from "@/lib/cn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import postImagesUpload from "@/api/image/post-images-upload";
import patchArticle from "@/api/article/patch-article";
import getArticleDetail from "@/api/article/get-article-detail";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleFormSchema, ArticleFormSchema } from "@/lib/schema";
import { parseArticleContent } from "@/lib/utils";
import { CreateArticleData } from "@/types/article";
import { Container } from "@/components/layout";
import { ArticleFormFields } from "@/components/features/article";
import { Form } from "@/components/ui";
import { ArticleEditFormProps } from "@/types/article";
import {
  ARTICLE_COMMON_STYLES,
  ARTICLE_FORM_STYLES,
} from "@/components/features/article/index.styles";
import { useToast } from "@/providers/toast-provider";

export default function ArticleEditForm({ articleId }: ArticleEditFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const { data: article } = useQuery({
    queryKey: ["getArticleDetail", articleId],
    queryFn: () => getArticleDetail({ articleId }),
    enabled: !!articleId,
  });

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: ({ articleId, patchBody }: { articleId: number; patchBody: CreateArticleData }) =>
      patchArticle(articleId, patchBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getArticleDetail", articleId] });
      queryClient.invalidateQueries({ queryKey: ["getArticles"] });
      sessionStorage.setItem("articleEditToast", "게시글이 수정되었습니다.");
      router.replace(`/article/${articleId}`);
    },
    onError: () => {
      showToast("게시글 수정에 실패했습니다.", "error");
    },
  });

  const defaultValues: ArticleFormSchema | undefined = article
    ? {
        title: article.title,
        content: parseArticleContent(article.content),
        image: article.image ?? "",
      }
    : undefined;

  const handleImageChange = (fileOrUrl: File | string | null) => {
    setSelectedFile(fileOrUrl instanceof File ? fileOrUrl : null);
    setIsImageDeleted(fileOrUrl === null);
  };

  const handleSubmit = async (values: ArticleFormSchema) => {
    let imageUrl: string | undefined = values.image;

    if (selectedFile) {
      try {
        const { url } = await postImagesUpload({ url: selectedFile });
        imageUrl = url;
      } catch {
        imageUrl = undefined;
      }
    }

    const patchBody: CreateArticleData = {
      title: values.title,
      content: {
        content: values.content.content,
        token: values.content.token,
      },
    };

    if (selectedFile && imageUrl) {
      patchBody.image = imageUrl;
    }
    if (isImageDeleted) {
      patchBody.image = null;
    }

    mutate({ articleId, patchBody });
  };

  return (
    <Container as="main" className={cn(ARTICLE_COMMON_STYLES.main.wrapper, "pb-[120px]")}>
      <h2 className="visually-hidden">자유게시판</h2>
      <section>
        <Form<ArticleFormSchema>
          className={ARTICLE_FORM_STYLES.form.wrapper}
          onSubmit={handleSubmit}
          resolver={zodResolver(articleFormSchema)}
          defaultValues={defaultValues}
          mode="onChange"
          reValidateMode="onChange"
        >
          <ArticleFormFields
            type="edit"
            onImageChange={handleImageChange}
            isMutating={isMutating}
          />
        </Form>
      </section>
    </Container>
  );
}
