import { fetchAllUserObjects, fetchUserDataConfig } from "@/data/apiUserData";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import FormProjectCreate from "@/data/project/create/Form";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/data/project/definitions";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const userDataConfig = await fetchUserDataConfig(userId);
  const projects = await fetchAllUserObjects<Project>(userId, "project");
  const formConfig = {
    userDataConfig,
  };

  return (
    <div className="flex flex-col gap-4 justify-between items-center my-4 w-full">
      <header className="flex flex-row justify-between my-1">
        <h2 className="text-left text-lg sm:text-xl">Create Project</h2>
      </header>
      <Separator className="h-2!" />

      <FormProjectCreate
        userId={userId}
        formConfig={formConfig}
        projects={projects}
      />
    </div>
  );
}
