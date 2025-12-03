import Link from "next/link";
import {
  ListSectionHeaderProps,
  ListSectionContentProps,
  ArticleFormFieldProps,
  CreateSectionHeaderProps,
} from "@/types/article";
import { Input, Modal } from "@/components/ui";
import { ARTICLE_COMMON_STYLES, ARTICLE_LIST_STYLES } from "./index.styles";

export function ListSectionHeader({ title, moreHref }: ListSectionHeaderProps) {
  return (
    <div className={ARTICLE_LIST_STYLES.section.heading.wrapper}>
      <h3 className={ARTICLE_LIST_STYLES.section.heading.title}>{title}</h3>
      {moreHref && (
        <Link href={moreHref} className={ARTICLE_LIST_STYLES.section.heading.moreHref}>
          더보기
        </Link>
      )}
    </div>
  );
}

export function ListSectionContent({ gridType = "none", children }: ListSectionContentProps) {
  return (
    <div className={ARTICLE_COMMON_STYLES.section.contents}>
      <div className={ARTICLE_LIST_STYLES.section.grid[gridType]}>{children}</div>
    </div>
  );
}

export function ArticleField({
  id,
  label,
  errorMsg,
  caption,
  required = false,
  children,
}: ArticleFormFieldProps) {
  return (
    <Input id={id} errorMsg={errorMsg}>
      <Input.Label label={label} caption={caption} size="md" required={required} />
      {children}
      <Input.Error />
    </Input>
  );
}

export function CreateSectionHeader({
  title,
  as = "h2",
  className,
  children,
}: CreateSectionHeaderProps) {
  const HeadingTag = as;

  return (
    <div className={className}>
      <HeadingTag>{title}</HeadingTag>
      <div>{children}</div>
    </div>
  );
}

type ArticleConfirmModalProps = {
  title: string;
  message: string;
  confirmButtonTitle: string;
  onClick?: () => void;
  handleClose: () => void;
};

export function ArticleConfirmModal({
  title,
  message,
  confirmButtonTitle,
  onClick,
  handleClose,
}: ArticleConfirmModalProps) {
  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className="p-[16px_0]">
        <Modal.HeaderWithOnlyTitle title={title} />
        <div className="pb-[24px]">
          <p className="text-center text-caption text-gray-300">{message}</p>
        </div>
        <Modal.FooterWithButtons
          confirmButtonTitle={confirmButtonTitle}
          onConfirm={onClick ?? (() => {})}
        />
      </div>
    </Modal>
  );
}
