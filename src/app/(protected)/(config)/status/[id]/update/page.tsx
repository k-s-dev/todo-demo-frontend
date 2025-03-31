import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchUserDataConfig } from "@/data/apiUserData";
import FormStatusUpdate from "@/data/status/update/Form";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const params = await props.params;
  const statusId = params.id;

  const userDataConfig = await fetchUserDataConfig(userId);

  const status = userDataConfig.statuses.find(
    (obj) => obj.id.toString() === statusId,
  );
  if (!status) {
    notFound();
  }

  return (
    <>
      <header className="flex flex-row justify-between my-1">
        <h2 className="text-left text-lg sm:text-xl">Update Status</h2>
        <Link href={`/workspace/${status.workspace}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </header>
      <Separator className="h-2!" />
      <FormStatusUpdate
        userId={userId}
        status={status}
        workspaces={userDataConfig.workspaces}
        disabled={false}
      />
    </>
  );
}
