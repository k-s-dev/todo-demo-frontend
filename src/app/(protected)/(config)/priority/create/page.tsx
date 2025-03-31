import { Separator } from "@/components/ui/separator";
import { fetchUserDataConfig } from "@/data/apiUserData";
import FormPriorityCreate from "@/data/priority/create/Form";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: {
  searchParams?: Promise<{
    workspaceId?: number;
  }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const userDataConfig = await fetchUserDataConfig(userId);

  const searchParams = await props.searchParams;
  const workspaceId = searchParams?.workspaceId;

  if (!workspaceId) {
    notFound();
  }

  return (
    <>
      <header className="flex flex-row justify-start my-1">
        <h2 className="text-lg sm:text-xl">Create Priority</h2>
      </header>
      <Separator className="h-2!" />
      <FormPriorityCreate
        userId={userId}
        workspaceId={workspaceId}
        workspaces={userDataConfig.workspaces}
      />
    </>
  );
}
