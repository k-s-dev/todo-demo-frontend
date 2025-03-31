import { fetchUserDataConfig } from "@/data/apiUserData";
import FormStatusDelete from "@/data/status/delete/Form";
import { auth } from "@clerk/nextjs/server";
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
    <main className="flex flex-col gap-4 justify-between items-center my-4 w-full px-4">
      <FormStatusDelete userId={userId} status={status} />
    </main>
  );
}
