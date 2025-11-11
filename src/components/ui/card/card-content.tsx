import Image from "next/image";

type CardContentProps = {
  title: string;
  image?: string;
};

export default function CardContent({ title, image }: CardContentProps) {
  return (
    <div>
      <div>{title}</div>
      {image && (
        <div>
          <Image src={image} fill alt="" />
        </div>
      )}
    </div>
  );
}
