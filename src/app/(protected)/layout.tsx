import { auth } from "@clerk/nextjs/server";
import Providers from "./Providers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  if (!userId) redirect("/");
  return <Providers>{children}</Providers>;
}
