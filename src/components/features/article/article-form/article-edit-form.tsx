"use client";
import { useQuery } from "@tanstack/react-query";
import patchArticle from "@/api/article/patch-article";
import getArticleDetail from "@/api/article/get-article-detail";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleFormSchema, ArticleFormSchema } from "@/lib/schema";
import { Container } from "@/components/layout";
import { ArticleFormFields } from "@/components/features/article";
import { Form } from "@/components/ui";

type ArticleEditFormProps = {
  articleId: number;
};

export default function ArticleEditForm({ articleId }: ArticleEditFormProps) {
  const { data, isLoading } = useQuery<ArticleFormSchema>({
    queryKey: ["article-edit", articleId],
    queryFn: () => getArticleDetail({ articleId: Number(articleId) }),
    enabled: !!articleId,
  });
  if (isLoading || !data) {
    return;
  }

  const handleSubmit = async (values: ArticleFormSchema) => {
    await patchArticle(articleId, {
      ...values,
      image: values.image ?? null,
    });
  };

  return (
    <Container as="main">
      <h2 className="visually-hidden">자유게시판</h2>
      <Form<ArticleFormSchema>
        onSubmit={handleSubmit}
        resolver={zodResolver(articleFormSchema)}
        defaultValues={data}
        mode="onChange"
        reValidateMode="onChange"
      >
        <ArticleFormFields type="edit" />
      </Form>
    </Container>
  );
}
