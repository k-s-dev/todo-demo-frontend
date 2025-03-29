import { Separator } from "@/components/ui/separator";
import { fetchUserDataConfig } from "@/data/apiUserData";
import FormWorkspaceCreate from "@/data/workspace/create/Form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const userDataConfig = await fetchUserDataConfig(userId);

  return (
    <>
      <header className="flex flex-row justify-between my-1">
        <h2 className="text-left text-lg sm:text-xl">Create Workspace</h2>
      </header>
      <Separator className="h-2!" />
      <div className="w-1/2 min-w-60 px-4">
        <FormWorkspaceCreate
          userId={userId}
          workspaces={userDataConfig.workspaces}
        />
      </div>
    </>
  );
}
