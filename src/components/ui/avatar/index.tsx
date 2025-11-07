"use client";

import cn from "@/lib/cn";
import { useState } from "react";
import Image from "next/image";
import { isValidImageSrc } from "@/lib/utils";
//import DefaultAvatarImage from "@/assets/icons/ic-member-circle.svg"; //svgr 주석

type AvatarProps = {
  image?: string | null;
  alt?: string;
  className?: string;
};

export default function Avatar({ image, alt = "", className }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const isValidImage = isValidImageSrc(image) && !imageError;

  return (
    <span className={cn("relative", className)}>
      {isValidImage ? (
        <Image src={image} alt={alt} fill onError={() => setImageError(true)} />
      ) : (
        <span>없는 이미지 </span>
      )}
    </span>
  );
}
