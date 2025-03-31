import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchUserDataConfig } from "@/data/apiUserData";
import FormCategoryUpdate from "@/data/category/update/Form";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const params = await props.params;
  const categoryId = params.id;

  const userDataConfig = await fetchUserDataConfig(userId);

  const category = userDataConfig.categories.find(
    (obj) => obj.id.toString() === categoryId,
  );
  if (!category) {
    notFound();
  }

  return (
    <>
      <header className="flex flex-row justify-between my-1">
        <h2 className="text-left text-lg sm:text-xl">Update Category</h2>
        <Link href={`/workspace/${category.workspace}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </header>
      <Separator className="h-2!" />
      <FormCategoryUpdate
        userId={userId}
        category={category}
        workspaces={userDataConfig.workspaces}
        disabled={false}
      />
    </>
  );
}
