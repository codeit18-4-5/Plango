"use client";

import postArticle from "@/api/article/post-article";
import { articleFormSchema, ArticleFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosErrorMsg } from "@/lib/error";
import { Container } from "@/components/layout";
import { ArticleFormFields } from "@/components/features/article";
import { Form } from "@/components/ui";

export default function CreateArticlesPage() {
  const handleSubmit = async (data: ArticleFormSchema) => {
    await postArticle({
      ...data,
      image: data.image ?? null,
    });
  };

  return (
    <Container as="main">
      <h2 className="visually-hidden">자유게시판</h2>
      <Form<ArticleFormSchema>
        onSubmit={handleSubmit}
        onServerError={axiosErrorMsg}
        resolver={zodResolver(articleFormSchema)}
        mode="onBlur"
        reValidateMode="onBlur"
      >
        <ArticleFormFields />
      </Form>
    </Container>
  );
}
