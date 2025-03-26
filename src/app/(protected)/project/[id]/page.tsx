import { fetchAllUserObjects, fetchUserDataConfig } from "@/data/apiUserData";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Project, ProjectFormConfig } from "@/data/project/definitions";
import FormProjectUpdate from "@/data/project/update/Form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const formConfig: ProjectFormConfig = {
    userDataConfig,
    workspace,
    category,
    disableField: { form: true },
  };

  return (
    <div className="mx-auto my-2 grid grid-cols-1 px-2">
      <header className="flex flex-col sm:flex-row justify-between my-1 gap-2">
        <h2 className="text-left text-lg sm:text-xl">
          <span className="text-muted-foreground">Project: </span>
          <span className="">{project.title.toUpperCase()}</span>
        </h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Link href={`/project/${project.id}/update`}>
            <Button variant="outline" className="w-full">
              Edit
            </Button>
          </Link>
          <Link href={`/project/${project.id}/delete`}>
            <Button variant="outline" className="w-full">
              Delete
            </Button>
          </Link>
        </section>
      </header>

      <Separator className="h-2!" />

      <FormProjectUpdate
        userId={userId}
        formConfig={formConfig}
        projects={projects}
        project={project}
      />
    </div>
  );
}
