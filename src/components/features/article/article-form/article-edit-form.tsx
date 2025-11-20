"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import postImagesUpload from "@/api/image/post-images-upload";
import patchArticle from "@/api/article/patch-article";
import getArticleDetail from "@/api/article/get-article-detail";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleFormSchema, ArticleFormSchema } from "@/lib/schema";
import { Container } from "@/components/layout";
import { ArticleFormFields } from "@/components/features/article";
import { Form } from "@/components/ui";
import { ArticleEditFormProps } from "@/types/article";
import {
  ARTICLE_COMMON_STYLES,
  ARTICLE_FORM_STYLES,
} from "@/components/features/article/index.styles";

export default function ArticleEditForm({ articleId }: ArticleEditFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data: article, isPending } = useQuery({
    queryKey: ["article-edit", articleId],
    queryFn: () => getArticleDetail({ articleId }),
    enabled: !!articleId,
  });

  const defaultValues: ArticleFormSchema | undefined = article
    ? {
        title: article.title,
        content: article.content,
        image: article.image ?? "",
      }
    : undefined;

  const handleImageChange = (fileOrUrl: File | string | null) => {
    if (fileOrUrl instanceof File) {
      setSelectedFile(fileOrUrl);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (values: ArticleFormSchema) => {
    let imageUrl: string | null | undefined = values.image;

    if (selectedFile) {
      try {
        const { url } = await postImagesUpload({ url: selectedFile });
        imageUrl = url;
      } catch {
        imageUrl = null;
      }
    }

    await patchArticle(articleId, {
      ...values,
      image: imageUrl || null,
    });
  };

  if (isPending || !defaultValues) return null;

  return (
    <Container as="main" className={(ARTICLE_COMMON_STYLES.main.wrapper, "pb-[120px]")}>
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
          <ArticleFormFields type="edit" onImageChange={handleImageChange} />
        </Form>
      </section>
    </Container>
  );
}
