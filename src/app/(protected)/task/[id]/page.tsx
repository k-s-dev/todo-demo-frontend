import { fetchAllUserObjects, fetchUserDataConfig } from "@/data/apiUserData";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Project } from "@/data/project/definitions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Task, TaskFormConfig } from "@/data/task/definitions";
import FormTaskUpdate from "@/data/task/update/Form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const { userId } = await auth();
  if (!userId) redirect("/");

  const userDataConfig = await fetchUserDataConfig(userId);
  const projects = await fetchAllUserObjects<Project>(userId, "project");
  const tasks = await fetchAllUserObjects<Task>(userId, "task");
  const task = tasks.find((obj) => obj.id.toString() === id);
  const workspace = userDataConfig.workspaces.find(
    (obj) => obj.id === task?.workspace,
  );
  const category = userDataConfig.categories.find(
    (obj) => obj.id === task?.category,
  );
  const project = projects.find(
    (obj) => obj.id === task?.project,
  );

  if (!task || !workspace || !category) {
    notFound();
  }

  const formConfig: TaskFormConfig = {
    userDataConfig,
    selection: { workspace, category, project },
    disable: { form: true },
  };

  return (
    <div className="mx-auto my-2 grid grid-cols-1 px-2">
      <header className="flex flex-col sm:flex-row justify-between my-1 gap-2">
        <h2 className="text-left text-lg sm:text-xl">
          <span className="text-muted-foreground">Task: </span>
          <span className="">{task.title.toUpperCase()}</span>
        </h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Link href={`/task/${task.id}/update`}>
            <Button variant="outline" className="w-full">
              Edit
            </Button>
          </Link>
          <Link href={`/task/${task.id}/delete`}>
            <Button variant="outline" className="w-full">
              Delete
            </Button>
          </Link>
        </section>
      </header>

      <Separator className="h-2!" />

      <FormTaskUpdate
        userId={userId}
        formConfig={formConfig}
        projects={projects}
        tasks={tasks}
        task={task}
      />
    </div>
  );
}
