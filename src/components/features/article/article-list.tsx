import { useState, useEffect } from "react";
import { useResponsive } from "@/hooks/use-responsive";
import getArticles from "@/api/article/get-articles";
import { Input, Dropdown, Card } from "@/components/ui";
import CardSkeleton from "@/components/skeleton-ui/card-skeleton";
import { Article } from "@/types/article";
import { ARTICLE_STYLES } from "./article.styles";
import IcDropdown from "@/assets/icons/ic-dropdown.svg";

type SectionHeaderProps = {
  title: string;
  moreHref?: string;
};

type DropdownOption = {
  label: string;
  value: "recent" | "like";
};

type ArticleSortDropdownProps = {
  options: DropdownOption[];
  selected: DropdownOption;
  onChange: (option: DropdownOption) => void;
};

type ArticleListSectionProps = {
  articles: Article[];
  options: DropdownOption[];
  selected: DropdownOption;
  onChange: (option: DropdownOption) => void;
};

export function SectionHeader({ title, moreHref }: SectionHeaderProps) {
  return (
    <div className={ARTICLE_STYLES.section.heading.wrapper}>
      <h3 className={ARTICLE_STYLES.section.heading.title}>{title}</h3>
      {moreHref && (
        <a href={moreHref} className={ARTICLE_STYLES.section.heading.moreHref}>
          더보기
        </a>
      )}
    </div>
  );
}

export function ArticleSearchBar() {
  return (
    <section className={ARTICLE_STYLES.section.wrapper}>
      <Input id="search">
        <Input.Label label="게시글 검색" hidden />
        <Input.Search placeholder="검색어를 입력해주세요" className="duration-200" />
      </Input>
    </section>
  );
}

export function ArticleSortDropdown({ options, selected, onChange }: ArticleSortDropdownProps) {
  return (
    <Dropdown size="sm" className={ARTICLE_STYLES.dropdown.wrapper}>
      <Dropdown.TriggerSelect
        isIcon
        intent="select"
        selectedLabel={selected.label}
        className={ARTICLE_STYLES.dropdown.trigger}
      >
        <IcDropdown className={ARTICLE_STYLES.dropdown.icon} />
      </Dropdown.TriggerSelect>
      <Dropdown.Menu>
        {options.map(option => (
          <Dropdown.Option
            key={option.value}
            option={option}
            onClick={() => onChange(option)}
            className={ARTICLE_STYLES.dropdown.option}
          >
            {option.label}
          </Dropdown.Option>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export function BestArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isClient, setIsClient] = useState(false);

  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    getArticles({ page: 1, pageSize: 3, orderBy: "like" }).then(res => {
      setArticles(res.list);
    });
  }, []);

  let showCount = 3;

  if (isClient) {
    if (isMobile) showCount = 1;
    if (isTablet) showCount = 2;
    if (isDesktop) showCount = 3;
  }

  return (
    <section className={ARTICLE_STYLES.section.wrapper}>
      <SectionHeader title="베스트 게시글" moreHref="/article/best" />
      <div className={ARTICLE_STYLES.section.contents}>
        <div className={ARTICLE_STYLES.section.grid.best}>
          {articles.length === 0
            ? Array.from({ length: showCount }).map((_, i) => (
                <CardSkeleton
                  key={i}
                  badge
                  className={i === 1 ? "mobile:hidden desktop:block" : ""}
                />
              ))
            : articles.slice(0, showCount).map(article => (
                <Card id={article.id} href={`/article/${article.id}`} key={article.id}>
                  <Card.Badge />
                  <Card.Content
                    title={article.title}
                    image={article.image}
                    className={ARTICLE_STYLES.card.content}
                  />
                  <Card.Info
                    writer={article.writer.nickname}
                    createdAt={article.createdAt}
                    likeCount={article.likeCount}
                    image={article.writer.image}
                  />
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}

export function ArticleListSection({
  articles,
  options,
  selected,
  onChange,
}: ArticleListSectionProps) {
  return (
    <section className={ARTICLE_STYLES.section.wrapper}>
      <div className={ARTICLE_STYLES.section.heading.wrapper}>
        <SectionHeader title="게시글" />
        <ArticleSortDropdown options={options} selected={selected} onChange={onChange} />
      </div>
      <div className={ARTICLE_STYLES.section.contents}>
        <div className={ARTICLE_STYLES.section.grid.normal}>
          {articles.length === 0
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : articles.map(article => (
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
        </div>
      </div>
    </section>
  );
}
