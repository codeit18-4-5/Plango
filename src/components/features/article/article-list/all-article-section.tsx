import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import getArticles from "@/api/article/get-articles";
import { Card, Dropdown } from "@/components/ui";
import { ArticleListEmpty } from "@/components/features/article";
import CardSkeleton from "@/components/skeleton-ui/card-skeleton";
import { Article, ArticleSortOption, OrderByType } from "@/types/article";
import { ListSectionHeader, ListSectionContent } from "../layout";
import { ARTICLE_COMMON_STYLES, ARTICLE_LIST_STYLES } from "../index.styles";
import IcDropdown from "@/assets/icons/ic-dropdown.svg";

const sortOptions: ArticleSortOption[] = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
];

export default function AllArticleSection() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orderBy, setOrderBy] = useState<OrderByType>("recent");
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const param = searchParams.get("orderBy");

    setOrderBy(param === "like" || param === "recent" ? (param as OrderByType) : "recent");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    getArticles({ page: 1, pageSize: 6, orderBy }).then(res => {
      setArticles(res.list);
      setIsLoading(false);
    });
  }, [orderBy]);

  const setQueryParams = (newOrderBy: OrderByType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.set("orderBy", newOrderBy);
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };

  const selectedSort = sortOptions.find(opt => opt.value === orderBy) ?? sortOptions[0];

  const onSortChange = (option: ArticleSortOption) => {
    setQueryParams(option.value);
  };

  return (
    <section className={ARTICLE_LIST_STYLES.section.wrapper}>
      <div className={ARTICLE_LIST_STYLES.section.heading.wrapper}>
        <ListSectionHeader title="게시글" />
        <Dropdown size="sm" className={ARTICLE_COMMON_STYLES.dropdown.wrapper}>
          <Dropdown.TriggerSelect
            isIcon
            intent="select"
            selectedLabel={selectedSort.label}
            className={ARTICLE_COMMON_STYLES.dropdown.trigger}
          >
            <IcDropdown className={ARTICLE_COMMON_STYLES.dropdown.icon} />
          </Dropdown.TriggerSelect>
          <Dropdown.Menu>
            {sortOptions.map(option => (
              <Dropdown.Option
                key={option.value}
                option={option}
                onClick={() => onSortChange(option)}
                className={ARTICLE_COMMON_STYLES.dropdown.option}
              >
                {option.label}
              </Dropdown.Option>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <ListSectionContent gridType="all">
        {isLoading && Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        {!isLoading && articles.length === 0 && <ArticleListEmpty />}
        {!isLoading &&
          articles.length > 0 &&
          articles.map(article => (
            <Card id={article.id} href={`/article/${article.id}`} key={article.id}>
              <Card.Content title={article.title} image={article.image} />
              <Card.Info
                writer={article.writer.nickname}
                createdAt={article.createdAt}
                likeCount={article.likeCount}
                image={article.writer.image}
              />
            </Card>
          ))}
      </ListSectionContent>
    </section>
  );
}
