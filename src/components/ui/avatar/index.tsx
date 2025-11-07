import cn from "@/lib/cn";
import Image from "next/image";
import DefaultAvatarImage from "@/assets/icons/ic-member-circle.svg";

type AvatarProps = {
  image?: string;
  alt?: string;
  className?: string;
};

export default function Avatar({ image, alt = "", className }: AvatarProps) {
  const src = image?.trim();
  return (
    <span className={cn("relative", className)}>
      {src ? <Image src={src} alt={alt} fill /> : <DefaultAvatarImage className="h-full w-full" />}
    </span>
  );
}
