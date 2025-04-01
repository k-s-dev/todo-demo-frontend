import { UserDataConfig } from "@/lib/types";
import ProjectTable from "./Table";
import { fetchAllUserObjects } from "@/data/apiUserData";
import { Project } from "../../definitions";

export default async function ProjectList({
  userId,
  userDataConfig,
}: {
  userId: string;
  userDataConfig: UserDataConfig;
}) {
  const projects = await fetchAllUserObjects<Project>(userId, "project");
  return (
    <ProjectTable
      userId={userId}
      userDataConfig={userDataConfig}
      projects={projects}
    />
  );
}
