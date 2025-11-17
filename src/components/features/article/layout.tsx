import { ArticleFormFieldProps, CreateSectionHeaderProps } from "@/types/article";
import { Input } from "@/components/ui";

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

export function CreateSectionHeader({ title, as = "h2", children }: CreateSectionHeaderProps) {
  const HeadingTag = as;

  return (
    <div>
      <HeadingTag>{title}</HeadingTag>
      <div>{children}</div>
    </div>
  );
}
