import { fetchUserDataConfig } from "@/data/apiUserData";
import FormTagDelete from "@/data/tag/delete/Form";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const params = await props.params;
  const tagId = params.id;

  const userDataConfig = await fetchUserDataConfig(userId);

  const tag = userDataConfig.tags.find(
    (obj) => obj.id.toString() === tagId,
  );
  if (!tag) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-4 justify-between items-center my-4 w-full px-4">
      <FormTagDelete userId={userId} tag={tag} />
    </main>
  );
}
