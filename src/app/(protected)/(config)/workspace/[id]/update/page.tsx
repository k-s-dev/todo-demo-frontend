import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchUserDataConfig } from "@/data/apiUserData";
import FormWorkspaceUpdate from "@/data/workspace/update/Form";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const { userId } = await auth();
  if (!userId) redirect("/");

  const userDataConfig = await fetchUserDataConfig(userId);

  const workspaces = userDataConfig.workspaces;
  const workspace = workspaces.find((obj) => obj.id.toString() === id);

  if (!workspace) {
    throw new Error("Resource does not exist.");
  }

  return (
    <>
      <header className="flex flex-row justify-between my-1">
        <h2 className="text-left text-lg sm:text-xl">Update Workspace</h2>
        <Link href={`/workspace/${workspace.id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </header>
      <Separator className="h-2!" />
      <FormWorkspaceUpdate
        userId={userId}
        workspace={workspace}
        workspaces={workspaces}
        disabled={false}
      />
    </>
  );
}
