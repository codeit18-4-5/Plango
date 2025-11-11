"use client";

import { Card } from "@/components/ui";
export default function Home() {
  return (
    <div className="grid gap-4 p-4">
      <Card id={1}>
        <Card.Link href={"/"}>
          <Card.Badge />
          <Card.Content
            title="ssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasd"
            image="/assets/images/img-test.jpeg"
          />
          <Card.Info writer="참깨" createdAt="2025-11-09T10:30:00.000Z" likeCount={10000} />
        </Card.Link>
        <Card.Actions />
      </Card>
      <Card id={2}>
        <Card.Link href={"/"}>
          <Card.Badge />
          <Card.Content
            title="ssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasd"
            image="/assets/images/img-test.jpeg"
          />
          <Card.Info writer="참깨" createdAt="2025-11-09T10:30:00.000Z" likeCount={10000} />
        </Card.Link>
        <Card.Actions />
      </Card>
      <Card id={3}>
        <Card.Content title="카드에용 (이미지 없음)" />
        <Card.Info writer="참깨" createdAt="2025-11-09T10:30:00.000Z" likeCount={12} />
      </Card>
    </div>
  );
}
