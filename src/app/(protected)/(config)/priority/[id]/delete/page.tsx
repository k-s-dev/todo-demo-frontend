import { fetchUserDataConfig } from "@/data/apiUserData";
import FormPriorityDelete from "@/data/priority/delete/Form";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const params = await props.params;
  const priorityId = params.id;

  const userDataConfig = await fetchUserDataConfig(userId);

  const priority = userDataConfig.priorities.find(
    (obj) => obj.id.toString() === priorityId,
  );
  if (!priority) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-4 justify-between items-center my-4 w-full px-4">
      <FormPriorityDelete userId={userId} priority={priority} />
    </main>
  );
}
