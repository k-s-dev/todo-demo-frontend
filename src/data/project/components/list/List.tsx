import { UserDataConfig } from "@/lib/types";
import ProjectTable from "./Table";
import { fetchAllUserObjects } from "@/data/apiUserData";
import { Project } from "../../definitions";

export default async function ProjectList({
  userId,
  userDataConfig,
  query,
}: {
  userId: string;
  userDataConfig: UserDataConfig;
  query?: string;
}) {
  const projects = await fetchAllUserObjects<Project>(userId, "project");
  return (
    <ProjectTable
      userId={userId}
      userDataConfig={userDataConfig}
      projects={projects}
      query={query}
    />
  );
}
