import { CARD_CONTENT_STYLES } from "./index.styles";
import Image from "next/image";

type CardContentProps = {
  title: string;
  image?: string;
};

export default function CardContent({ title, image }: CardContentProps) {
  return (
    <div className={CARD_CONTENT_STYLES.wrapper}>
      <div className={CARD_CONTENT_STYLES.title}>{title}</div>
      {image && (
        <div className={CARD_CONTENT_STYLES.image}>
          <Image src={image} fill alt="" />
        </div>
      )}
    </div>
  );
}
