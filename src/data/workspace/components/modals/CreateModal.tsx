import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Workspace } from "../../definitions";
import { Button } from "@/components/ui/button";
import FormWorkspaceCreate from "../../create/Form";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{titleButton}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titleModal}</DialogTitle>
        </DialogHeader>
        <FormWorkspaceCreate userId={userId} workspaces={workspaces} />
      </DialogContent>
    </Dialog>
  );
}
