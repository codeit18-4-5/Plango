"use client";

import postArticle from "@/api/article/post-article";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosErrorMsg } from "@/lib/error";
import { Form } from "@/components/ui";
import { createArticleSchema, CreateArticleSchema } from "@/lib/schema";
import { Container } from "@/components/layout";
import { ArticleFormFields } from "@/components/features/article";

export default function CreateArticlesPage() {
  const handleSubmit = async (data: CreateArticleSchema) => {
    await postArticle(data);
  };
  return (
    <Container as="main">
      <h2 className="visually-hidden">자유게시판</h2>
      <Form<CreateArticleSchema>
        onSubmit={handleSubmit}
        onServerError={axiosErrorMsg}
        resolver={zodResolver(createArticleSchema)}
        mode="onBlur"
        reValidateMode="onBlur"
      >
        <ArticleFormFields />
      </Form>
    </Container>
  );
}
