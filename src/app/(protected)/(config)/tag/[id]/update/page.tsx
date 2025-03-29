import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchUserDataConfig } from "@/data/apiUserData";
import FormTagUpdate from "@/data/tag/update/Form";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const params = await props.params;
  const tagId = params.id;

  const userDataConfig = await fetchUserDataConfig(userId);

  const tag = userDataConfig.tags.find((obj) => obj.id.toString() === tagId);
  if (!tag) {
    notFound();
  }

  return (
    <>
      <header className="flex flex-row justify-between my-1">
        <h2 className="text-left text-lg sm:text-xl">Update Tag</h2>
        <Link href={`/workspace/${tag.workspace}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </header>
      <Separator className="h-2!" />
      <FormTagUpdate
        userId={userId}
        tag={tag}
        workspaces={userDataConfig.workspaces}
        disabled={false}
      />
    </>
  );
}
