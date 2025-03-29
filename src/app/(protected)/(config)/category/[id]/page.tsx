import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchUserDataConfig } from "@/data/apiUserData";
import FormCategoryUpdate from "@/data/category/update/Form";
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
      <header className="flex flex-col sm:flex-row justify-between my-1 gap-2">
        <h2 className="text-left text-lg sm:text-xl">
          Category: <span className="">{category.name.toUpperCase()}</span>
        </h2>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 justify-between">
          <Link href={`/category/${category.id}/update`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Link href={`/category/${category.id}/delete`}>
            <Button variant="outline">Delete</Button>
          </Link>
        </section>
      </header>

      <Separator className="h-2!" />

      <FormCategoryUpdate
        userId={userId}
        category={category}
        workspaces={userDataConfig.workspaces}
        disabled={true}
      />
    </>
  );
}
