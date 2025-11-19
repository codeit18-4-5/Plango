"use client";
import { useQuery } from "@tanstack/react-query";
import patchArticle from "@/api/article/patch-article";
import getArticleDetail from "@/api/article/get-article-detail";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleFormSchema, ArticleFormSchema } from "@/lib/schema";
import { Container } from "@/components/layout";
import { ArticleFormFields } from "@/components/features/article";
import { Form } from "@/components/ui";
import {
  ARTICLE_COMMON_STYLES,
  ARTICLE_FORM_STYLES,
} from "@/components/features/article/index.styles";

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
    <Container as="main" className={(ARTICLE_COMMON_STYLES.main.wrapper, "pb-[120px]")}>
      <h2 className="visually-hidden">자유게시판</h2>
      <section>
        <Form<ArticleFormSchema>
          className={ARTICLE_FORM_STYLES.form.wrapper}
          onSubmit={handleSubmit}
          resolver={zodResolver(articleFormSchema)}
          defaultValues={data}
          mode="onChange"
          reValidateMode="onChange"
        >
          <ArticleFormFields type="edit" />
        </Form>
      </section>
    </Container>
  );
}
