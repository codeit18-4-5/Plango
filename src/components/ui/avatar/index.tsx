"use client";

import cn from "@/lib/cn";
import { useState } from "react";
import Image from "next/image";
import { isValidImageSrc } from "@/lib/utils";
import { avatarStyles } from "./index.styles";
import FallbackImageBasic from "@/assets/icons/ic-member-circle.svg";
import FallbackImageSquare from "@/assets/icons/ic-img.svg";

type AvatarProps = {
  image?: string | null;
  alt?: string;
  className?: string;
  shape?: "basic" | "square";
};

export default function Avatar({ image, alt = "", shape = "basic", className }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const isValidImage = isValidImageSrc(image) && !imageError;

  return (
    <span className={cn(avatarStyles({ shape }), className)}>
      {isValidImage ? (
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          draggable={false}
          onError={() => setImageError(true)}
        />
      ) : shape === "basic" ? (
        <FallbackImageBasic />
      ) : (
        <FallbackImageSquare />
      )}
    </span>
  );
}
