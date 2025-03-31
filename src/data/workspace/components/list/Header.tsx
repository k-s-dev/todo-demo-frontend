import { Workspace } from "../../definitions";
import WorkspaceCreateModal from "../modals/CreateModal";

export default function WorkspaceListHeader({
  userId,
  workspaces,
}: {
  userId: string;
  workspaces: Workspace[];
}) {
  return (
    <header className="my-2 flex flex-col items-center justify-start gap-4 md:flex-row md:justify-between">
      <h3>Workspace List</h3>
      <WorkspaceCreateModal userId={userId} workspaces={workspaces} />
    </header>
  );
}
