import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchUserDataConfig } from "@/data/apiUserData";
import FormStatusUpdate from "@/data/status/update/Form";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    workspaceId?: number;
  }>;
}) {
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
      <header className="flex flex-col sm:flex-row justify-between my-1 gap-2">
        <h2 className="text-left text-lg sm:text-xl">
          Status: <span className="">{status.name.toUpperCase()}</span>
        </h2>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 justify-between">
          <Link href={`/status/${status.id}/update`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Link href={`/status/${status.id}/delete`}>
            <Button variant="outline">Delete</Button>
          </Link>
        </section>
      </header>

      <Separator className="h-2!" />

      <FormStatusUpdate
        userId={userId}
        status={status}
        workspaces={userDataConfig.workspaces}
        disabled={true}
      />
    </>
  );
}
