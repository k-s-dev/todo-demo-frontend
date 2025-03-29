import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchUserDataConfig } from "@/data/apiUserData";
import FormPriorityUpdate from "@/data/priority/update/Form";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
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
    <>
      <header className="flex flex-row justify-between my-1">
        <h2 className="text-left text-lg sm:text-xl">Update Priority</h2>
        <Link href={`/workspace/${priority.workspace}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </header>
      <Separator className="h-2!" />
      <FormPriorityUpdate
        userId={userId}
        priority={priority}
        workspaces={userDataConfig.workspaces}
        disabled={false}
      />
    </>
  );
}
