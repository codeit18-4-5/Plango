"use client";

import cn from "@/lib/cn";
import { useState } from "react";
import Image from "next/image";
import { isValidImageSrc } from "@/lib/utils";
import DefaultAvatarImage from "@/assets/icons/ic-member-circle.svg";

type AvatarProps = {
  image?: string | null;
  alt?: string;
  className?: string;
};

export default function Avatar({ image, alt = "", className }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const isValidImage = isValidImageSrc(image) && !imageError;

  return (
    <span className={cn("relative inline-block", className)}>
      {isValidImage ? (
        <Image src={image} alt={alt} fill onError={() => setImageError(true)} />
      ) : (
        <DefaultAvatarImage />
      )}
    </span>
  );
}
