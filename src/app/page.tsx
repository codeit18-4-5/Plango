import { Card } from "@/components/ui";
export default function Home() {
  return (
    <div className="grid gap-4 p-4">
      <Card id={1} href="/" className="border p-4">
        <Card.Badge />
        <Card.Content title="ssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasdssdsdasdasdasd" />
        <Card.Info writer="참깨" createdAt="2025-11-09T10:30:00.000Z" likeCount={10000} />
      </Card>
      <Card id={2} href="/" className="border p-4">
        <Card.Badge />
        <Card.Content title="카드에용" />
        <Card.Info writer="참깨" createdAt="2025-11-09T10:30:00.000Z" likeCount={12} />
      </Card>
    </div>
  );
}
