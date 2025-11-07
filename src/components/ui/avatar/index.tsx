import cn from "@/lib/cn";
import Image from "next/image";
import { isValidImageSrc } from "@/lib/utils";
import DefaultAvatarImage from "@/assets/icons/ic-member-circle.svg";

type AvatarProps = {
  image?: string | null;
  alt?: string;
  className?: string;
};

export default function Avatar({ image, alt = "", className }: AvatarProps) {
  const hasValidSrc = isValidImageSrc(image);
  return (
    <span className={cn("relative", className)}>
      {hasValidSrc ? (
        <Image src={image} alt={alt} fill />
      ) : (
        <DefaultAvatarImage className="h-full w-full" />
      )}
    </span>
  );
}
