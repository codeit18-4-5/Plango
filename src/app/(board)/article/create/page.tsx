"use client";

import { useState } from "react";
import postImagesUpload from "@/api/image/post-images-upload";
import postArticle from "@/api/article/post-article";
import { articleFormSchema, ArticleFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosErrorMsg } from "@/lib/error";
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

  const handleImageChange = (fileOrUrl: File | string | null) => {
    setSelectedFile(fileOrUrl instanceof File ? fileOrUrl : null);
  };

  const handleSubmit = async (data: ArticleFormSchema) => {
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
    await postArticle(postBody);
  };

  return (
    <Container as="main" className={ARTICLE_COMMON_STYLES.main.wrapper}>
      <h2 className="visually-hidden">자유게시판</h2>
      <Form<ArticleFormSchema>
        onSubmit={handleSubmit}
        onServerError={axiosErrorMsg}
        resolver={zodResolver(articleFormSchema)}
        mode="onBlur"
        reValidateMode="onBlur"
        className={ARTICLE_FORM_STYLES.form.wrapper}
        defaultValues={{
          title: "",
          content: "",
          image: "",
        }}
      >
        <ArticleFormFields type="create" onImageChange={handleImageChange} />
      </Form>
    </Container>
  );
}
