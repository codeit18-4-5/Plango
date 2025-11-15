"use client";

import { useState } from "react";
import { isValidImageSrc } from "@/lib/utils";
import { CARD_CONTENT_STYLES } from "./index.styles";
import cn from "@/lib/cn";
import Image from "next/image";
import FallbackImage from "@/assets/icons/ic-img.svg";
import { BASE64_IMAGE } from "@/constants/image";

type CardContentProps = {
  title: string;
  image?: string | null;
  className?: string;
  blurDataURL?: string;
};

export default function CardContent({
  title,
  image,
  className,
  blurDataURL = BASE64_IMAGE.CARD_IMAGE_BLUR,
}: CardContentProps) {
  const [imageError, setImageError] = useState(false);
  const hasValidImageSrc = isValidImageSrc(image);

  return (
    <div className={cn(CARD_CONTENT_STYLES.wrapper, className)}>
      <div className={CARD_CONTENT_STYLES.title}>{title}</div>
      {hasValidImageSrc && (
        <div className={`${CARD_CONTENT_STYLES.image.wrapper}`}>
          {!imageError ? (
            <Image
              src={image}
              fill
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
              placeholder="blur"
              blurDataURL={blurDataURL}
              onError={() => setImageError(true)}
            />
          ) : (
            <FallbackImage className={CARD_CONTENT_STYLES.image.icon} />
          )}
        </div>
      )}
    </div>
  );
}
