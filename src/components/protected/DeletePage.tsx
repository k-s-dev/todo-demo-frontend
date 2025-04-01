"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FormStateType } from "@/lib/types";
import { DialogClose } from "../ui/dialog";

export default function DeletePage({
  formAction,
  formState,
  formId = "form-delete",
  disabled = false,
  isModal,
}: {
  formAction: string | (() => void);
  formState: FormStateType;
  formId?: string;
  disabled?: boolean;
  isModal?: boolean;
}) {
  const router = useRouter();

  return (
    <>
      <p className="text-red-800 dark:text-red-300">
        This is a destructive action, please confirm to delete the resource.
      </p>
      <div className="flex gap-8">
        <form action={formAction} id={formId} inert={disabled}>
          <Button
            variant="outline"
            className="hover:text-white hover:bg-red-700"
          >
            Confirm
          </Button>
        </form>
        {isModal && (
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        )}
        {!isModal && (
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        )}
      </div>
      <p className="my-8 text-xl text-slate-700">{formState.message}</p>
    </>
  );
}
