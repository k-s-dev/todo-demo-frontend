import { UserDataConfig } from "@/lib/types";
import TaskTable from "./Table";
import { fetchAllUserObjects } from "@/data/apiUserData";
import { Task } from "../../definitions";
import { Project } from "@/data/project/definitions";

export default async function TaskList({
  userId,
  userDataConfig,
  query,
}: {
  userId: string;
  userDataConfig: UserDataConfig;
  query?: string;
}) {
  const tasks = await fetchAllUserObjects<Task>(userId, "task");
  const projects = await fetchAllUserObjects<Project>(userId, "project");

  return (
    <div className="container">
      <TaskTable
        userId={userId}
        userDataConfig={userDataConfig}
        projects={projects}
        tasks={tasks}
        query={query}
      />
    </div>
  );
}
