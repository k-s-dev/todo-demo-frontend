import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function FormModal({
  titleButton,
  titleModal,
  classNameContent = "sm:max-w-3xl",
  triggerComponent,
  children,
}: {
  titleButton?: string;
  titleModal?: string;
  classNameContent?: string;
  triggerComponent?: React.ReactNode;
  children?: React.ReactNode;
}) {
  let trigger;
  if (triggerComponent) {
    trigger = triggerComponent;
  } else {
    trigger = <Button variant="outline">{titleButton}</Button>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={classNameContent}>
        <DialogHeader>
          <DialogTitle>{titleModal}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
