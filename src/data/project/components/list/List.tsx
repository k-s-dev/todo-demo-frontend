import { UserDataConfig } from "@/lib/types";
import { fetchAllUserObjects } from "@/data/apiUserData";
import { Project } from "../../definitions";
import ProjectTable from "./Table";

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
    <div className="container">
      <ProjectTable
        userId={userId}
        userDataConfig={userDataConfig}
        projects={projects}
        query={query}
      />
    </div>
  );
}
