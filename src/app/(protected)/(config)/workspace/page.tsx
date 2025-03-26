import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { fetchUserDataConfig } from "@/data/apiUserData";
import WorkspaceListHeader from "@/data/workspace/components/list/Header";
import WorkspaceList from "@/data/workspace/components/list/List";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const userDataConfig = await fetchUserDataConfig(userId);

  return (
    <div className="mx-auto my-2 grid grid-cols-1 px-2 w-full">
      <WorkspaceListHeader />
      <Separator />
      <WorkspaceList userId={userId} userDataConfig={userDataConfig} />
    </div>
  );
}
