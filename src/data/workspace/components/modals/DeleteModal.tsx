import { Workspace } from "../../definitions";
import FormWorkspaceDelete from "../../delete/Form";
import FormModal from "@/data/FormModal";

export default function WorkspaceDeleteModal({
  userId,
  workspace,
  titleButton = "Delete",
  titleModal = "Delete Workspace",
}: {
  userId: string;
  workspace: Workspace;
  titleButton?: string;
  titleModal?: string;
}) {
  return (
    <FormModal titleButton={titleButton} titleModal={titleModal}>
      <FormWorkspaceDelete userId={userId} workspace={workspace} />
    </FormModal>
  );
}
