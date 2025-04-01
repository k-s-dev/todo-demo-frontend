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
  children,
}: {
  titleButton?: string;
  titleModal?: string;
  classNameContent?: string;
  children?: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{titleButton}</Button>
      </DialogTrigger>
      <DialogContent className={classNameContent}>
        <DialogHeader>
          <DialogTitle>{titleModal}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
