import FormModal from "@/data/FormModal";
import { Workspace } from "../../definitions";
import FormWorkspaceUpdate from "../../update/Form";

export default function WorkspaceUpdateModal({
  userId,
  workspace,
  workspaces,
  titleButton = "Edit",
  titleModal = "Edit Workspace",
}: {
  userId: string;
  workspace: Workspace;
  workspaces: Workspace[];
  titleButton?: string;
  titleModal?: string;
}) {
  return (
    <FormModal titleButton={titleButton} titleModal={titleModal}>
      <FormWorkspaceUpdate
        userId={userId}
        workspace={workspace}
        workspaces={workspaces}
      />
    </FormModal>
  );
}
