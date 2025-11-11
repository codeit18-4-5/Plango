"use client";

import { useState } from "react";
import { isValidImageSrc } from "@/lib/utils";
import { CARD_CONTENT_STYLES } from "./index.styles";
import Image from "next/image";

type CardContentProps = {
  title: string;
  image?: string | null;
};

export default function CardContent({ title, image }: CardContentProps) {
  const [imageError, setImageError] = useState(false);
  const isValidImage = isValidImageSrc(image) && !imageError;

  return (
    <div className={CARD_CONTENT_STYLES.wrapper}>
      <div className={CARD_CONTENT_STYLES.title}>{title}</div>
      {isValidImage && (
        <div className={CARD_CONTENT_STYLES.image}>
          <Image src={image} fill alt="" draggable={false} onError={() => setImageError(true)} />
        </div>
      )}
    </div>
  );
}
