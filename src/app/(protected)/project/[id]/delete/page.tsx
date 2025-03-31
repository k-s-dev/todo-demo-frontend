import { fetchAllUserObjects, fetchUserDataConfig } from "@/data/apiUserData";
import { Project } from "@/data/project/definitions";
import FormProjectDelete from "@/data/project/delete/Form";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

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

  return (
    <div className="flex flex-col gap-4 justify-between items-center my-4 w-full px-4">
      <FormProjectDelete userId={userId} project={project} />
    </div>
  );
}
