import { Workspace } from "../../definitions";
import FormWorkspaceCreate from "../../create/Form";
import FormModal from "@/data/FormModal";

export default function WorkspaceCreateModal({
  userId,
  workspaces,
  titleButton = "Create",
  titleModal = "Create Workspace",
}: {
  userId: string;
  workspaces: Workspace[];
  titleButton?: string;
  titleModal?: string;
}) {
  return (
    <FormModal titleButton={titleButton} titleModal={titleModal}>
      <FormWorkspaceCreate userId={userId} workspaces={workspaces} />
    </FormModal>
  );
}
