import CategoryCard from "./CategoryCard";
import ProjectCard from "./ProjectCard";
import TaskCard from "./TaskCard";
import WorkspaceCard from "./WorkspaceCard";

export default function Features() {
  return (
    <>
      <section className="grid items-center justify-center gap-4 px-4 py-4">
        <h1 className="text-center text-lime-800">Orgainze your tasks</h1>
        <p className="max-w-xl justify-self-center text-center text-justify tracking-normal text-muted-foreground">
          Oranize <b>Tasks</b> using <b>Workspaces</b>, <b>Categories</b>,{" "}
          <b>Projects</b>. There are <b>Tags</b>, <b>Status</b>, <b>Priority</b>{" "}
          to help with searching, sorting and tracking. Optionally track
          projects and tasks with <b>dates</b> (start, end, estimated start,
          estimated end).
        </p>
        <p className="max-w-xl justify-self-center text-justify tracking-normal text-muted-foreground">
          Workspaces, categories and projects can be configured to fit as per
          use case. Demo provides some examples.
        </p>
      </section>
      <div
        id="featureCardsContainer"
        className="grid grid-cols-1 items-stretch gap-4 px-4 py-4 lg:grid-cols-2 lg:px-36 justify-items-stretch"
      >
        <WorkspaceCard />
        <CategoryCard />
        <ProjectCard />
        <TaskCard />
      </div>
    </>
  );
}
