import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { WorkspaceFormState } from "./definitions";

export function FormContent({
  formId,
  disabled,
  formState,
  isPending,
}: {
  formId: string;
  disabled: boolean;
  formState: WorkspaceFormState;
  isPending: boolean;
}) {
  return (
    <section id={`${formId}-container`} className="flex flex-col my-2 gap-2">
      <section id={`${formId}-inputs`} className="flex flex-col gap-2">
        <InputName formState={formState} formId={formId} disabled={disabled} />
        <Separator />
        <InputDescription
          formState={formState}
          formId={formId}
          disabled={disabled}
        />
        <Separator />
        <InputIsDefault
          formState={formState}
          formId={formId}
          disabled={disabled}
        />
      </section>
      <Separator className="h-2!" />
      <FormErrors formState={formState} />
      {disabled || <SubmitButton isPending={isPending} disabled={disabled} />}
    </section>
  );
}

export function ErrorEl({ text }: { text: string }) {
  return <p className="mt-4 text-sm text-red-700 dark:text-red-300">{text}</p>;
}

export function FormErrors({ formState }: { formState: WorkspaceFormState }) {
  return (
    <>
      <div aria-live="polite" aria-atomic="true">
        {formState.message ? (
          <>
            <h5>Form errors</h5>
            <ErrorEl text={formState.message} />
            <Separator className="h-2!" />
          </>
        ) : null}
      </div>
    </>
  );
}

export function SubmitButton({
  isPending,
  disabled = false,
}: {
  isPending: boolean;
  disabled: boolean;
}) {
  return (
    <Button
      variant="outline"
      className="self-end w-1/3"
      disabled={disabled || isPending}
    >
      {isPending ? "Submitting..." : "Submit"}
    </Button>
  );
}

export function FieldError({
  formState,
  inputId,
  inputName,
}: {
  inputId: string;
  inputName: "name" | "description" | "is_default";
  formState: WorkspaceFormState;
}) {
  let errorEls;
  if (Object.keys(formState).includes("errors")) {
    errorEls = <p></p>;
  }
  if (formState.errors && Object.keys(formState.errors).includes(inputName)) {
    errorEls =
      formState.errors[inputName] &&
      formState.errors[inputName].map((error: string) => (
        <ErrorEl key={error} text={error} />
      ));
  }
  return (
    <section
      id={`${inputId}-error`}
      aria-live="polite"
      aria-atomic="true"
    >
      {errorEls}
    </section>
  );
}

export function InputName({
  formState,
  formId,
  disabled = false,
}: {
  formState: WorkspaceFormState;
  formId: string;
  disabled: boolean;
}) {
  const inputName = "name";
  const inputId = `${formId}-input-${inputName}`;
  const labelText = "Name (*): ";

  return (
    <>
      <article
        id={`${inputId}-article`}
        className="flex flex-col md:items-center md:flex-row gap-2"
      >
        <label htmlFor={`${inputId}`} className="font-bold w-1/2">
          {labelText}
        </label>

        <Input
          id={inputId}
          form={formId}
          name={inputName}
          disabled={disabled}
          defaultValue={formState?.data?.name}
          type="text"
          aria-describedby={`${inputId}-error`}
        />
      </article>
      {/* errors */}
      <FieldError inputId={inputId} inputName={inputName} formState={formState} />
    </>
  );
}

export function InputDescription({
  formState,
  formId,
  disabled = false,
}: {
  formState: WorkspaceFormState;
  formId: string;
  disabled: boolean;
}) {
  const inputName = "description";
  const inputId = `${formId}-input-${inputName}`;
  const labelText = "Description";

  return (
    <article id={`${inputId}-article`} className="flex flex-col gap-2">
      <label htmlFor={`${inputId}`} className="font-bold">
        {labelText}
      </label>
      <Textarea
        id={inputId}
        form={formId}
        name={inputName}
        disabled={disabled}
        defaultValue={formState?.data?.description}
        rows={2}
      />
      {/* errors */}
      <FieldError inputId={inputId} inputName={inputName} formState={formState} />
    </article>
  );
}

export function InputIsDefault({
  formState,
  formId,
  disabled = false,
}: {
  formState: WorkspaceFormState;
  formId: string;
  disabled: boolean;
}) {
  const inputName = "is_default";
  const inputId = `${formId}-input-${inputName}`;
  const labelText = "Default: ";

  return (
    <article
      id={`${inputId}-article`}
      className="flex items-center flex-col md:flex-row gap-2"
    >
      <label htmlFor={`${inputId}`} className="font-bold">
        {labelText}
      </label>
      <Switch
        id={inputId}
        form={formId}
        name={inputName}
        disabled={disabled}
        defaultChecked={formState?.data?.is_default}
      />
      <FieldError inputId={inputId} inputName={inputName} formState={formState} />
    </article>
  );
}
