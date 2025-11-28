import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InputFieldSkeleton from "./input-field-skeleton";
import { Container } from "../layout";

export default function ProfileSkeleton() {
  return (
    <Container className="max-w-[792px]">
      <div className="flex flex-col gap-6">
        <Skeleton height={24} width={120} />
        <Skeleton circle={true} height={80} width={80} />
        <ul className="flex flex-col gap-6">
          <li>
            <Skeleton height={24} width={120} style={{ marginBottom: 12}} />
            <InputFieldSkeleton />
          </li>
          <li>
            <Skeleton height={24} width={120} style={{ marginBottom: 12}} />
            <InputFieldSkeleton />
          </li>
          <li>
            <Skeleton height={24} width={120} style={{ marginBottom: 12}} />
            <InputFieldSkeleton />
          </li>
        </ul>
        <div className="flex items-center justify-between">
          <Skeleton height={24} width={120} />
          <Skeleton height={48} width={180} borderRadius={12} />
        </div>
      </div>
    </Container>
  );
}
