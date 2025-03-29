import { UserDataConfig } from "@/lib/types";
import TaskTable from "./Table";
import { fetchAllUserObjects } from "@/data/apiUserData";
import { Task } from "../../definitions";

export default async function TaskList({
  userId,
  userDataConfig,
}: {
  userId: string;
  userDataConfig: UserDataConfig;
}) {
  const tasks = await fetchAllUserObjects<Task>(userId, "task");
  return <TaskTable userId={userId} userDataConfig={userDataConfig} tasks={tasks} />;
}
