import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Sidebar from "@/components/protected/sidebar/Sidebar";
import { Separator } from "@/components/ui/separator";
import { fetchUserDataConfig } from "@/data/apiUserData";
import ProjectList from "@/data/project/components/list/List";
import TaskList from "@/data/task/components/list/List";

export default async function page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/");
  const userDataConfig = await fetchUserDataConfig(userId);
  const params = await searchParams;
  const query = params?.query || "";

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr]">
        <Sidebar userDataConfig={userDataConfig} />
        <main className="mx-4 my-4">
          <ProjectList
            userId={userId}
            userDataConfig={userDataConfig}
            query={query}
          />
          <Separator className="h-2! my-4" />
          <TaskList
            userId={userId}
            userDataConfig={userDataConfig}
            query={query}
          />
        </main>
      </div>
    </>
  );
}
