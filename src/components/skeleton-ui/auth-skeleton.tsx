import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InputFieldSkeleton from "./input-field-skeleton";

export default function AuthSkeleton({ intent }: { intent: "login" | "signup" | "password" }) {
  return (
    <div>
      <div className="text-center">
        <Skeleton height={58} width={150} style={{ marginBottom: 48 }} />
      </div>
      <ul className="flex flex-col gap-6">
        <li>
          <Skeleton height={24} width={120} style={{ marginBottom: 12 }} />
          <InputFieldSkeleton />
        </li>
        <li>
          <Skeleton height={24} width={120} style={{ marginBottom: 12 }} />
          <InputFieldSkeleton />
        </li>
        {intent === "signup" && (
          <>
            <li>
              <Skeleton height={24} width={120} style={{ marginBottom: 12 }} />
              <InputFieldSkeleton />
            </li>
            <li>
              <Skeleton height={24} width={120} style={{ marginBottom: 12 }} />
              <InputFieldSkeleton />
            </li>
          </>
        )}
        {intent === "login" && (
          <li className="text-right">
            <Skeleton height={24} width={120} style={{ marginBottom: 12 }} />
          </li>
        )}
      </ul>
      <Skeleton height={48} width={"100%"} style={{ marginTop: 28 }} />
      {intent !== "password" && (
        <>
          <div className="text-center">
            <Skeleton height={24} width={"80%"} style={{ marginTop: 24, marginBottom: 24 }} />
          </div>
          <Skeleton height={12} width={"100%"} style={{ marginTop: 24 }} />
          <div className="mt-6 flex items-center justify-between">
            <Skeleton height={16} width={120} />
            <Skeleton circle={true} height={44} width={44} />
          </div>
        </>
      )}
    </div>
  );
}
