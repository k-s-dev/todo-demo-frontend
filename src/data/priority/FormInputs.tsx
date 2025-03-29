import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PriorityFormKeys, PriorityFormState } from "./definitions";
import { Workspace } from "../workspace/definitions";

export function FormContent({
  workspaces,
  formState,
  formId,
  disabled,
  isPending,
}: {
  workspaces?: Workspace[];
  formState: PriorityFormState;
  formId: string;
  disabled: boolean;
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
        <section className="flex flex-col sm:flex-row justify-between gap-2">
          <InputWorkspace
            formState={formState}
            formId={formId}
            disabled={true}
            workspaces={workspaces}
          />
          <InputOrder
            formState={formState}
            formId={formId}
            disabled={disabled}
          />
        </section>
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

export function FormErrors({ formState }: { formState: PriorityFormState }) {
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
  inputName: PriorityFormKeys;
  formState: PriorityFormState;
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
    <section id={`${inputId}-error`} aria-live="polite" aria-atomic="true">
      {errorEls}
    </section>
  );
}

export function InputName({
  formState,
  formId,
  disabled = false,
  includeLabel = true,
}: {
  formState: PriorityFormState;
  formId: string;
  disabled: boolean;
  includeLabel?: boolean;
}) {
  const inputName = "name";
  const inputId = `${formId}-input-${inputName}`;
  const labelText = (
    <>
      Name<sup>*</sup>
    </>
  );
  const placeholder = "Name...";

  return (
    <>
      <article
        id={`${inputId}-article`}
        className="flex flex-col md:items-center md:flex-row gap-2"
      >
        {includeLabel && (
          <label htmlFor={`${inputId}`} className="w-48">
            {labelText}
          </label>
        )}

        <Input
          id={inputId}
          form={formId}
          name={inputName}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={formState?.data?.name}
          type="text"
          aria-describedby={`${inputId}-error`}
          className="md:w-2/3"
        />
      </article>
      {/* errors */}
      <FieldError
        inputId={inputId}
        inputName={inputName}
        formState={formState}
      />
    </>
  );
}

export function InputDescription({
  formState,
  formId,
  disabled = false,
}: {
  formState: PriorityFormState;
  formId: string;
  disabled: boolean;
}) {
  const inputName = "description";
  const inputId = `${formId}-input-${inputName}`;
  const labelText = "Description";
  const placeholder = "Description ...";

  return (
    <article
      id={`${inputId}-article`}
      className="flex flex-col md:items-center md:flex-row gap-2"
    >
      <label htmlFor={`${inputId}`} className="w-48">
        {labelText}
      </label>
      <Textarea
        id={inputId}
        form={formId}
        name={inputName}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={formState?.data?.description}
        rows={2}
        className="md:w-2/3"
      />
      {/* errors */}
      <FieldError
        inputId={inputId}
        inputName={inputName}
        formState={formState}
      />
    </article>
  );
}

export function InputWorkspace({
  formState,
  workspaces,
  formId,
  disabled = true,
}: {
  formState: PriorityFormState;
  workspaces?: Workspace[];
  formId: string;
  disabled: boolean;
}) {
  const inputName = "workspace";
  const inputId = `${formId}-input-${inputName}`;
  const labelText = (
    <>
      Workspace<sup>*</sup>
    </>
  );
  const workspace = workspaces?.find(
    (obj) => obj.id.toString() === formState.data?.workspace?.toString(),
  );
  // const placeholder = workspace?.name || "----";
  const placeholder = "-------";

  return (
    <article id={`${inputId}-article`} className="flex items-center gap-4">
      <label htmlFor={`${inputId}`} className="">
        {labelText}
      </label>

      <Select
        name={inputName}
        defaultValue={workspace?.id.toString()}
        disabled={disabled}
      >
        <SelectTrigger className="w-[180px] text-black!">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {workspaces &&
            workspaces.map((obj) => (
              <SelectItem key={obj.id} value={obj.id.toString()}>
                {obj.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {/* errors */}
      <FieldError
        inputId={inputId}
        inputName={inputName}
        formState={formState}
      />
    </article>
  );
}

export function InputOrder({
  formState,
  formId,
  disabled = false,
  includeLabel = true,
}: {
  formState: PriorityFormState;
  formId: string;
  disabled: boolean;
  includeLabel?: boolean;
}) {
  const inputName = "order";
  const inputId = `${formId}-input-${inputName}`;
  const labelText = (
    <>
      Order<sup>*</sup>
    </>
  );
  const placeholder = "1, 2 or 3";

  return (
    <>
      <article id={`${inputId}-article`} className="flex items-center gap-4">
        {includeLabel && (
          <label htmlFor={`${inputId}`} className="w-48">
            {labelText}
          </label>
        )}

        <Input
          id={inputId}
          form={formId}
          name={inputName}
          disabled={disabled}
          defaultValue={formState?.data?.order}
          placeholder={placeholder}
          aria-describedby={`${inputId}-error`}
          type="number"
          min={1}
          max={3}
        />
      </article>
      {/* errors */}
      <FieldError
        inputId={inputId}
        inputName={inputName}
        formState={formState}
      />
    </>
  );
}
