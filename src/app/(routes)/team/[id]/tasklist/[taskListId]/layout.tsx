import TaskListProvider from "./tasklist-provider";
import LayoutContent from "./layout-content";
import { formatDateToISOString, setDateTime } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  detail: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function TasklistLayout({ children, detail, params }: LayoutProps) {
  const { id } = await params;
  const groupId = Number(id);

  const currentDate = setDateTime(new Date());
  const formattedDate = formatDateToISOString(currentDate);

  return (
    <TaskListProvider groupId={groupId} date={formattedDate}>
      <LayoutContent detail={detail}>{children}</LayoutContent>
    </TaskListProvider>
  );
}
