import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Workspace } from "../../definitions";
import { Button } from "@/components/ui/button";
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{titleButton}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titleModal}</DialogTitle>
        </DialogHeader>
        <FormWorkspaceUpdate
          userId={userId}
          workspace={workspace}
          workspaces={workspaces}
        />
      </DialogContent>
    </Dialog>
  );
}
