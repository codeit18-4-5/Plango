"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { debounce } from "lodash";
import { Input } from "@/components/ui";
import { ARTICLE_LIST_STYLES } from "../index.styles";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("keyword") ?? "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const updateURL = (value: string) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("keyword", value);
    } else {
      url.searchParams.delete("keyword");
    }
    router.replace(url.toString());
  };

  const debouncedUpdateURL = useCallback(
    debounce((value: string) => {
      updateURL(value);
    }, 100),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchTerm(value);
    debouncedUpdateURL(value);
  };

  useEffect(() => {
    return () => {
      debouncedUpdateURL.cancel();
    };
  }, [debouncedUpdateURL]);

  return (
    <section className={ARTICLE_LIST_STYLES.section.wrapper}>
      <Input id="search">
        <Input.Label label="게시글 검색" hidden />
        <Input.Search
          placeholder="검색어를 입력해주세요"
          className="duration-200"
          value={searchTerm}
          onChange={handleChange}
          maxLength={50}
        />
      </Input>
    </section>
  );
}
