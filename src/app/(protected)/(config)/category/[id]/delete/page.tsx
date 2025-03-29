import { fetchUserDataConfig } from "@/data/apiUserData";
import FormCategoryDelete from "@/data/category/delete/Form";
import { auth } from "@clerk/nextjs/server";
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
    <main className="flex flex-col gap-4 justify-between items-center my-4 w-full px-4">
      <FormCategoryDelete userId={userId} category={category} />
    </main>
  );
}
