import { fetchUserDataConfig } from "@/data/apiUserData";
import FormWorkspaceDelete from "@/data/workspace/delete/Form";
import { auth } from "@clerk/nextjs/server";
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
    <main className="flex flex-col gap-4 justify-between items-center my-4 w-full px-4">
      <FormWorkspaceDelete userId={userId} workspace={workspace} />
    </main>
  );
}
