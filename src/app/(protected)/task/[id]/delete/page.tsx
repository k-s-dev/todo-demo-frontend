import { fetchAllUserObjects } from "@/data/apiUserData";
import { Task } from "@/data/task/definitions";
import FormTaskDelete from "@/data/task/delete/Form";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const { userId } = await auth();
  if (!userId) redirect("/");

  const tasks = await fetchAllUserObjects<Task>(userId, "task");
  const task = tasks.find((obj) => obj.id.toString() === id);
  if (!task) {
    notFound();
  }


  return (
    <div className="flex flex-col gap-4 justify-between items-center my-4 w-full px-4">
      <FormTaskDelete userId={userId} task={task} />
    </div>
  );
}
