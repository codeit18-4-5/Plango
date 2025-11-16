export type ArticleListEmptyProps = {
  message?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function ArticleListEmpty({
  message,
  children = "등록된 게시글이 없습니다.",
  className,
}: ArticleListEmptyProps) {
  return (
    <div
      className={`w-full p-[30px_0] text-center text-caption text-gray-500 tablet:p-[50px_0] ${className}`}
    >
      {message ?? children}
    </div>
  );
}
