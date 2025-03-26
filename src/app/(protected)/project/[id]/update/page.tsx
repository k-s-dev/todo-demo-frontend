import { fetchAllUserObjects, fetchUserDataConfig } from "@/data/apiUserData";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Project } from "@/data/project/definitions";
import FormProjectUpdate from "@/data/project/update/Form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const { userId } = await auth();
  if (!userId) redirect("/");

  const userDataConfig = await fetchUserDataConfig(userId);
  const projects = await fetchAllUserObjects<Project>(userId, "project");
  const project = projects.find((obj) => obj.id.toString() === id);
  const workspace = userDataConfig.workspaces.find(
    (obj) => obj.id === project?.workspace,
  );
  const category = userDataConfig.categories.find(
    (obj) => obj.id === project?.category,
  );

  if (!project || !workspace || !category) {
    notFound();
  }

  const formConfig = {
    userDataConfig,
    workspace,
    category,
  };

  return (
    <>
      <header className="flex flex-row justify-between my-1">
        <h2 className="text-left text-lg sm:text-xl">Update Project</h2>
        <Link href={`/project/${project.id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </header>
      <Separator className="h-2!" />

      <FormProjectUpdate
        userId={userId}
        formConfig={formConfig}
        projects={projects}
        project={project}
      />
    </>
  );
}
