"use client";

import { Workspace } from "../../definitions";
import WorkspaceDeleteModal from "../modals/DeleteModal";
import WorkspaceUpdateModal from "../modals/UpdateModal";

export default function WorkspaceDetailHeader({
  userId,
  workspace,
  workspaces,
}: {
  userId: string;
  workspace: Workspace;
  workspaces: Workspace[];
}) {
  return (
    <header className="flex flex-col sm:flex-row justify-between my-1 gap-2">
      <h2 className="text-left text-lg sm:text-xl">
        <span className="text-muted-foreground">Workspace: </span>
        <span className="capitalize">{workspace.name}</span>
      </h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <WorkspaceUpdateModal
          userId={userId}
          workspace={workspace}
          workspaces={workspaces}
        />
        <WorkspaceDeleteModal userId={userId} workspace={workspace} />
      </section>
    </header>
  );
}
