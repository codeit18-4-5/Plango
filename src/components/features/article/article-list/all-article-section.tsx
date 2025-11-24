"use client";
import { useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import getArticles from "@/api/article/get-articles";
import deleteArticle from "@/api/article/delete-article";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { useAlert } from "@/providers/alert-provider";
import { useDebouncedValue, useInfiniteObserver } from "@/hooks";
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

const PAGE_SIZE = 4;
const DEBOUNCE_DELAY = 200;

export default function AllArticleSection() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentUser = useAuthStore(state => state.user);
  const param = searchParams.get("orderBy");
  const orderBy: OrderByType = param === "like" || param === "recent" ? param : "recent";
  const searchQuery = searchParams.get("keyword") ?? "";
  const { showAlert } = useAlert();

  const debouncedOrderBy = useDebouncedValue(orderBy, DEBOUNCE_DELAY);
  const debouncedQuery = useDebouncedValue(searchQuery, DEBOUNCE_DELAY);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteQuery<
    Article[],
    Error
  >({
    queryKey: ["getArticles", debouncedOrderBy, debouncedQuery],
    queryFn: ({ pageParam = 1 }) =>
      getArticles({
        orderBy: debouncedOrderBy,
        keyword: debouncedQuery,
        page: pageParam as number,
        pageSize: PAGE_SIZE,
      }).then(res => res.list),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Article[], allPages: Article[][]): number | undefined =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1,
    staleTime: 60000,
    placeholderData: previousData => previousData,
  });

  const articles = data?.pages.flat() ?? [];

  const ObserverRef = useInfiniteObserver({
    onIntersect: fetchNextPage,
    isEnabled: !!hasNextPage && !isFetchingNextPage,
  });

  const setQueryParams = (newOrderBy: OrderByType) => {
    queryClient.removeQueries({
      queryKey: ["getArticles", debouncedOrderBy, debouncedQuery],
    });

    const params = new URLSearchParams(searchParams.toString());

    params.delete("page");
    params.set("orderBy", newOrderBy);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const selectedSort = sortOptions.find(opt => opt.value === orderBy) ?? sortOptions[0];

  const { mutate: removeArticle } = useMutation({
    mutationFn: ({ articleId }: { articleId: number }) => deleteArticle({ articleId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getArticles"] });
    },
  });

  const handleDelete = useCallback(
    async (articleId: number) => {
      const confirmed = await showAlert({ type: "deleteArticle" });
      if (confirmed) removeArticle({ articleId });
    },
    [showAlert, removeArticle],
  );

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
          <Dropdown.Menu className="z-10">
            {sortOptions.map(option => (
              <Dropdown.Option
                key={option.value}
                option={option}
                onClick={() => setQueryParams(option.value)}
                className={ARTICLE_COMMON_STYLES.dropdown.option}
              >
                {option.label}
              </Dropdown.Option>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <ListSectionContent gridType={!isPending && articles.length === 0 ? "none" : "all"}>
        {isPending && Array.from({ length: PAGE_SIZE }).map((_, i) => <CardSkeleton key={i} />)}
        {!isPending && articles.length === 0 && searchQuery && (
          <ArticleListEmpty>
            <div className="text-body-l text-gray-500">
              <b className="text-gray-200">'{searchQuery}'</b> 에 대한 검색 결과가 없습니다
            </div>
          </ArticleListEmpty>
        )}
        {articles.map(article => (
          <Card
            id={article.id}
            href={`/article/${article.id}`}
            key={article.id}
            actions={
              currentUser?.id === article.writer.id
                ? [
                    {
                      label: "수정하기",
                      onClick: () => {
                        router.push(`/article/${article.id}/edit`);
                      },
                    },
                    {
                      label: "삭제하기",
                      onClick: async () => {
                        handleDelete(article.id);
                      },
                    },
                  ]
                : []
            }
          >
            <Card.Content title={article.title} image={article.image} />
            <Card.Info
              writer={article.writer.nickname}
              createdAt={article.createdAt}
              likeCount={article.likeCount}
              commentCount={article.commentCount}
              image={article.writer.image}
            />
          </Card>
        ))}
        {isFetchingNextPage &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => <CardSkeleton key={i} />)}
        <div ref={ObserverRef} className="infinite-scroll-trigger" />
      </ListSectionContent>
    </section>
  );
}
