import { Separator } from "@/components/ui/separator";
import { fetchUserDataConfig } from "@/data/apiUserData";
import CategoryTable from "@/data/category/Table";
import PriorityTable from "@/data/priority/components/list/Table";
import StatusTable from "@/data/status/components/list/Table";
import TagTable from "@/data/tag/Table";
import WorkspaceDetailHeader from "@/data/workspace/components/detail/Header";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const workspaceId = params.id;

  const { userId } = await auth();
  if (!userId) redirect("/");

  const userDataConfig = await fetchUserDataConfig(userId);

  const workspaces = userDataConfig.workspaces;
  const workspace = workspaces.find((obj) => obj.id.toString() === workspaceId);

  if (!workspace) {
    notFound();
  }

  const categories = userDataConfig.categories.filter(
    (obj) => obj.workspace === workspace.id,
  );
  const priorities = userDataConfig.priorities.filter(
    (obj) => obj.workspace === workspace.id,
  );
  const statuses = userDataConfig.statuses.filter(
    (obj) => obj.workspace === workspace.id,
  );
  const tags = userDataConfig.tags.filter(
    (obj) => obj.workspace === workspace.id,
  );

  return (
    <>
      <WorkspaceDetailHeader
        userId={userId}
        workspace={workspace}
        workspaces={workspaces}
      />
      <Separator className="h-2!" />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <PriorityTable
          userId={userId}
          workspaceId={workspace.id}
          workspaces={workspaces}
          priorities={priorities}
        />
        <StatusTable
          userId={userId}
          workspaces={workspaces}
          workspaceId={workspace.id}
          statuses={statuses}
        />
        <CategoryTable categories={categories} workspaceId={workspace.id} />
        <TagTable tags={tags} workspaceId={workspace.id} />
      </section>
    </>
  );
}
