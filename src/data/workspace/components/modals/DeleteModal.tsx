import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Workspace } from "../../definitions";
import FormWorkspaceDelete from "../../delete/Form";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{titleButton}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titleModal}</DialogTitle>
        </DialogHeader>
        <FormWorkspaceDelete userId={userId} workspace={workspace} />
      </DialogContent>
    </Dialog>
  );
}
