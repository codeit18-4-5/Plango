"use client";

import cn from "@/lib/cn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import postImagesUpload from "@/api/image/post-images-upload";
import patchArticle from "@/api/article/patch-article";
import getArticleDetail from "@/api/article/get-article-detail";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleFormSchema, ArticleFormSchema } from "@/lib/schema";
import { CreateArticleData } from "@/types/article";
import { Container } from "@/components/layout";
import { ArticleFormFields } from "@/components/features/article";
import { Form, Button } from "@/components/ui";
import { ArticleEditFormProps } from "@/types/article";
import {
  ARTICLE_COMMON_STYLES,
  ARTICLE_FORM_STYLES,
} from "@/components/features/article/index.styles";

export default function ArticleEditForm({ articleId }: ArticleEditFormProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //const queryClient = useQueryClient();
  const { data: article, isPending } = useQuery({
    queryKey: ["article-edit", articleId],
    queryFn: () => getArticleDetail({ articleId }),
    enabled: !!articleId,
  });

  // TODO: isSuccess, isError, error 처리는 추후 토스트로 처리 예정
  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: async (patchBody: CreateArticleData) => {
      return patchArticle(articleId, patchBody);
    },
    onSuccess: () => {
      //TODO: 자유게시판 리스트/상세페이지 캐시 최신 데이터 반영
    },
  });

  const defaultValues: ArticleFormSchema | undefined = article
    ? {
        title: article.title,
        content: article.content,
        image: article.image ?? "",
      }
    : undefined;

  const handleImageChange = (fileOrUrl: File | string | null) => {
    setSelectedFile(fileOrUrl instanceof File ? fileOrUrl : null);
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
      content: values.content,
      ...(imageUrl && { image: imageUrl }),
    };

    mutate(patchBody);
  };

  if (isPending) {
    return (
      <Container as="main" className={ARTICLE_COMMON_STYLES.empty.form}>
        <div className="text-gray-400">게시글 정보를 불러오는 중...</div>
      </Container>
    );
  }

  if (!defaultValues) {
    return (
      <Container as="main" className={ARTICLE_COMMON_STYLES.empty.form}>
        <div className="text-gray-400">게시글 정보를 찾을 수 없습니다.</div>
        <Button onClick={() => router.back()}>이전 페이지로 이동</Button>
      </Container>
    );
  }
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
