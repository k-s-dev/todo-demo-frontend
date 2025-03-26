import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  ProjectFormKeys,
  ProjectFormState,
  ProjectFormConfig,
  Project,
  ProjectFormData,
} from "./definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Workspace } from "../workspace/definitions";
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "../category/definitions";
import { Priority } from "../priority/definitions";
import { Status } from "../status/definitions";
import { Tag } from "../tag/definitions";
import { MultipleSelect } from "@/components/generic/MultipleSelect";

export function FormContent({
  formConfig,
  formState,
  isPending,
  projects,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
  isPending: boolean;
  projects: Project[];
}) {
  let workspaces = formConfig.userDataConfig?.workspaces;
  let categories = formConfig.userDataConfig?.categories;
  let priorities = formConfig.userDataConfig?.priorities;
  let statuses = formConfig.userDataConfig?.statuses;
  let tags = formConfig.userDataConfig?.tags;

  if (formConfig.workspace) {
    workspaces = workspaces?.filter((w) => w.id === formConfig.workspace?.id);
    categories = categories?.filter(
      (c) => c.workspace === formConfig.workspace?.id,
    );
    priorities = priorities?.filter(
      (o) => o.workspace === formConfig.workspace?.id,
    );
    statuses = statuses?.filter(
      (o) => o.workspace === formConfig.workspace?.id,
    );
    tags = tags?.filter((o) => o.workspace === formConfig.workspace?.id);
    projects = projects.filter((o) => o.workspace === formConfig.workspace?.id);
  }
  if (formConfig.category) {
    categories = categories?.filter((c) => c.id === formConfig.category?.id);
    projects = projects.filter((o) => o.category === formConfig.category?.id);
  }

  return (
    <section
      id={`${formConfig.formId}-container`}
      className="flex flex-col my-2 gap-2"
    >
      <section
        id={`${formConfig.formId}-inputs`}
        className="flex flex-col gap-1"
      >
        <FieldTitle formState={formState} formConfig={formConfig} />
        <Separator />
        <FieldIsVisible formState={formState} formConfig={formConfig} />
        <Separator />
        <FieldDetail formState={formState} formConfig={formConfig} />
        <Separator />
        <section
          id={`${formConfig.formId}-inputs-classification-row-1`}
          className="grid md:grid-cols-3 md:grid-rows-2 gap-1"
        >
          <FieldWorkspace
            formState={formState}
            formConfig={formConfig}
            workspaces={workspaces}
          />
          <FieldCategory
            formState={formState}
            formConfig={formConfig}
            categories={categories}
          />
          <FieldParent
            formState={formState}
            formConfig={formConfig}
            projects={projects}
          />
          <FieldPriority
            formState={formState}
            formConfig={formConfig}
            priorities={priorities}
          />
          <FieldStatus
            formState={formState}
            formConfig={formConfig}
            statuses={statuses}
          />
          <FieldTag formState={formState} formConfig={formConfig} tags={tags} />
        </section>
        <Separator />
        <section
          id={`${formConfig.formId}-inputs-classification-row-2`}
          className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-2"
        >
          <FieldEstimatedStartDate
            formState={formState}
            formConfig={formConfig}
          />
          <FieldStartDate formState={formState} formConfig={formConfig} />
          <FieldEstimatedEndDate
            formState={formState}
            formConfig={formConfig}
          />
          <FieldEndDate formState={formState} formConfig={formConfig} />
        </section>
        <Separator />
        <section
          id={`${formConfig.formId}-inputs-classification-row-3`}
          className="grid grid-cols-1 sm:grid-cols-2 grid-rows-1 gap-2"
        >
          <FieldEstimatedEffort formState={formState} formConfig={formConfig} />
          <FieldActualEffort formState={formState} formConfig={formConfig} />
        </section>
      </section>
      <Separator className="h-1!" />
      <FormErrors formState={formState} />
      <SubmitButton
        isPending={isPending}
        disabled={formConfig.disableField?.form || false}
      />
    </section>
  );
}

export function ErrorEl({ text }: { text: string }) {
  return <p className="mt-4 text-sm text-red-700 dark:text-red-300">{text}</p>;
}

export function FormErrors({ formState }: { formState: ProjectFormState }) {
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

export function ComponentError({
  formState,
  inputId,
  inputName,
}: {
  formState: ProjectFormState | undefined;
  inputId: string;
  inputName: ProjectFormKeys;
}) {
  if (!formState || !formState.errors || !formState.errors[inputName]) {
    return <p></p>;
  }
  return (
    <section id={`${inputId}-error`} aria-live="polite" aria-atomic="true">
      {formState.errors[inputName].map((error: string) => (
        <ErrorEl key={error} text={error} />
      ))}
    </section>
  );
}

export function FieldSelect({
  formConfig,
  formState,
  inputName,
  defaultValue,
  objectKey,
  labelText,
  children,
  disabled = false,
  required = false,
  placeholder = "-----",
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
  inputName: ProjectFormKeys;
  defaultValue: string | undefined;
  objectKey?: keyof ProjectFormData;
  labelText?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}) {
  // initial selected option is controlled using formState
  const inputId = `${formConfig.formId}-input-${inputName}`;
  if (!objectKey) objectKey = inputName;

  return (
    <>
      <article
        id={`${inputId}-article`}
        className="flex flex-col items-start justify-start gap-2 grow-0"
      >
        <label htmlFor={`${inputId}`} className="">
          {labelText || <span className="capitalize">{inputName}</span>}
          {required && <sup>*</sup>}
        </label>

        <Select
          name={inputName}
          defaultValue={defaultValue}
          disabled={disabled}
        >
          <SelectTrigger className="w-[180px] text-black!">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
        {disabled && (
          <input type="hidden" name={inputName} defaultValue={defaultValue} />
        )}
        {/* errors */}
        <ComponentError
          inputId={inputId}
          inputName={inputName}
          formState={formState}
        />
      </article>
    </>
  );
}

export function FieldDate({
  formConfig,
  formState,
  inputName,
  objectKey,
  labelText,
  required = false,
  placeholder = "-----",
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
  inputName: ProjectFormKeys;
  objectKey?: keyof ProjectFormData;
  labelText?: string;
  required?: boolean;
  placeholder?: string;
}) {
  // initial selected option is controlled using formState
  const inputId = `${formConfig.formId}-input-${inputName}`;
  if (!objectKey) objectKey = inputName;
  const defaultValue = formState.data[objectKey];
  let disabled = false;
  let readonly = false;
  if (
    formConfig.disableField &&
    typeof formConfig.disableField[objectKey] === "boolean"
  ) {
    disabled = formConfig.disableField[objectKey] || false;
  }
  if (
    formConfig.readonlyField &&
    typeof formConfig.readonlyField[objectKey] === "boolean"
  ) {
    readonly = formConfig.readonlyField[objectKey] || false;
  }

  return (
    <>
      <article
        id={`${inputId}-article`}
        className="grid sm:grid-cols-2 grid-cols-1 gap-2 items-center justify-start"
      >
        <label htmlFor={`${inputId}`} className="">
          {labelText || <span className="capitalize">{inputName}</span>}
          {required && <sup>*</sup>}
        </label>

        <Input
          id={inputId}
          form={formConfig.formId}
          name={inputName}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          type="date"
          aria-describedby={`${inputId}-error`}
          className=""
        />
        <ComponentError
          inputId={inputId}
          inputName={inputName}
          formState={formState}
        />
      </article>
    </>
  );
}

export function FieldNumberEffort({
  formConfig,
  formState,
  inputName,
  defaultValue,
  disabled,
  readonly,
  inputId,
  labelText,
  placeholder,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
  inputName: ProjectFormKeys;
  defaultValue: string | undefined;
  disabled: boolean;
  readonly: boolean;
  inputId: string;
  labelText: string;
  placeholder: string;
}) {
  return (
    <article id={`${inputId}-article`} className="flex flex-col gap-2 pr-4">
      {formConfig.excludeLabel?.estimated_effort || (
        <label htmlFor={`${inputId}`} className="">
          {labelText}
        </label>
      )}
      <Input
        id={inputId}
        form={formConfig.formId}
        name={inputName}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        className=""
        type="number"
        min={0}
      />
      {/* errors */}
      <ComponentError
        inputId={inputId}
        inputName={inputName}
        formState={formState}
      />
    </article>
  );
}

export function FieldTitle({
  formConfig,
  formState,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
}) {
  const inputName = "title";
  const defaultValue = formState?.data?.title;
  const disabled = formConfig.disableField?.title || false;
  const readonly = formConfig.readonlyField?.title || false;
  const placeholder = formConfig.disableField?.title ? "" : "Title...";
  const labelText = (
    <>
      Title<sup>*</sup>
    </>
  );
  const inputId = `${formConfig.formId}-input-${inputName}`;

  return (
    <>
      <article
        id={`${inputId}-article`}
        className="flex flex-col md:items-center md:flex-row gap-2"
      >
        {formConfig.excludeLabel?.title || (
          <label htmlFor={inputId} className="w-48">
            {labelText}
          </label>
        )}

        <Input
          id={inputId}
          form={formConfig.formId}
          name={inputName}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          type="text"
          aria-describedby={`${inputId}-error`}
          className="md:w-2/3"
        />
      </article>
      {/* errors */}
      <ComponentError
        inputId={inputId}
        inputName={inputName}
        formState={formState}
      />
    </>
  );
}

export function FieldDetail({
  formConfig,
  formState,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
}) {
  const inputName = "detail";
  const defaultValue = formState?.data?.detail;
  const disabled = formConfig.disableField?.detail || false;
  const readonly = formConfig.readonlyField?.detail || false;
  const labelText = "Detail";
  const placeholder = formConfig.disableField?.detail ? "" : "Detail...";
  const inputId = `${formConfig.formId}-input-${inputName}`;

  return (
    <article
      id={`${inputId}-article`}
      className="flex flex-col md:items-center md:flex-row gap-2"
    >
      {formConfig.excludeLabel?.detail || (
        <label htmlFor={`${inputId}`} className="w-48">
          {labelText}
        </label>
      )}
      <Textarea
        id={inputId}
        form={formConfig.formId}
        name={inputName}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        rows={2}
        className="md:w-2/3"
      />
      {/* errors */}
      <ComponentError
        inputId={inputId}
        inputName={inputName}
        formState={formState}
      />
    </article>
  );
}

export function FieldIsVisible({
  formConfig,
  formState,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
}) {
  const inputName = "is_visible";
  const inputId = `${formConfig.formId}-input-${inputName}`;
  const labelText = (
    <>
      Is visible: <sup>*</sup>
    </>
  );

  return (
    <>
      <article
        id={`${inputId}-article`}
        className="flex flex-col md:items-center md:flex-row gap-2"
      >
        {formConfig.excludeLabel?.title || (
          <label htmlFor={inputId} className="w-48">
            {labelText}
          </label>
        )}

        <Checkbox
          id={inputId}
          form={formConfig.formId}
          name={inputName}
          defaultChecked={formState?.data?.is_visible}
          disabled={formConfig.disableField?.is_visible || false}
          aria-describedby={`${inputId}-error`}
        />
      </article>
      {/* errors */}
      <ComponentError
        inputId={inputId}
        inputName={inputName}
        formState={formState}
      />
    </>
  );
}

export function FieldWorkspace({
  formConfig,
  formState,
  workspaces,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
  workspaces: Workspace[];
}) {
  // initial selected option is controlled using formState
  let defaultValue = formState.data.workspace?.toString();
  if (formConfig.workspace) {
    defaultValue = formConfig.workspace.id.toString();
  }
  return (
    <FieldSelect
      formState={formState}
      formConfig={formConfig}
      inputName="workspace"
      defaultValue={defaultValue}
      disabled={formConfig.disableField?.workspace}
      required
    >
      {workspaces.map((obj) => (
        <SelectItem key={obj.id} value={obj.id.toString()}>
          {obj.name}
        </SelectItem>
      ))}
    </FieldSelect>
  );
}

export function FieldCategory({
  formConfig,
  formState,
  categories,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
  categories: Category[];
}) {
  // initial selected option is controlled using formState
  let defaultValue = formState.data.category?.toString();
  if (formConfig.category) {
    defaultValue = formConfig.category.id.toString();
  }
  return (
    <FieldSelect
      formState={formState}
      formConfig={formConfig}
      inputName="category"
      defaultValue={defaultValue}
      disabled={formConfig.disableField?.category}
      required
    >
      {categories.map((obj) => {
        const workspace = formConfig.userDataConfig?.workspaces.find(
          (o) => o.id === obj.workspace,
        );
        if (workspace) {
          // for ts error as find can return undefined
          return (
            <SelectItem key={obj.id} value={obj.id.toString()}>
              {!formConfig.workspace
                ? `${workspace.name}: ${obj.name}`
                : obj.name}
            </SelectItem>
          );
        }
      })}
    </FieldSelect>
  );
}

export function FieldParent({
  formConfig,
  formState,
  projects,
  project,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
  projects: Project[];
  project?: Project;
}) {
  // initial selected option is controlled using formState
  let defaultValue = formState.data.parent?.toString();
  if (project) {
    defaultValue = project.id.toString();
  }
  const children = projects.map((obj) => {
    const workspace = formConfig.userDataConfig?.workspaces.find(
      (o) => o.id === obj.workspace,
    );
    const category = formConfig.userDataConfig?.categories.find(
      (o) => o.id === obj.category,
    );
    if (workspace && category) {
      // for ts error as find can return undefined
      return (
        <SelectItem key={obj.id} value={obj.id.toString()}>
          {!formConfig.workspace && !formConfig.category
            ? `ws: ${workspace.name} | cat: ${category.name} | ${obj.title}`
            : formConfig.workspace && !formConfig.category
              ? `cat: ${category.name} | ${obj.title}`
              : obj.title}
        </SelectItem>
      );
    }
  });
  return (
    <FieldSelect
      formState={formState}
      formConfig={formConfig}
      inputName="parent"
      defaultValue={defaultValue}
      disabled={formConfig.disableField?.parent}
    >
      {children}
    </FieldSelect>
  );
}

export function FieldPriority({
  formConfig,
  formState,
  priorities,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
  priorities: Priority[];
}) {
  // initial selected option is controlled using formState
  const defaultValue = formState.data.priority?.toString();
  return (
    <FieldSelect
      formState={formState}
      formConfig={formConfig}
      inputName="priority"
      defaultValue={defaultValue}
      disabled={formConfig.disableField?.priority}
    >
      {priorities.map((obj) => {
        const workspace = formConfig.userDataConfig?.workspaces.find(
          (o) => o.id === obj.workspace,
        );
        if (workspace) {
          return (
            <SelectItem key={obj.id} value={obj.id.toString()}>
              {!formConfig.workspace
                ? `${workspace.name}: ${obj.name}`
                : obj.name}
            </SelectItem>
          );
        }
      })}
    </FieldSelect>
  );
}

export function FieldStatus({
  formConfig,
  formState,
  statuses,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
  statuses: Status[];
}) {
  // initial selected option is controlled using formState
  const defaultValue = formState.data.status?.toString();
  const disabled = formConfig.disableField?.status;

  return (
    <FieldSelect
      formState={formState}
      formConfig={formConfig}
      inputName="status"
      defaultValue={defaultValue}
      disabled={disabled}
    >
      {statuses.map((obj) => {
        const workspace = formConfig.userDataConfig?.workspaces.find(
          (o) => o.id === obj.workspace,
        );
        if (workspace) {
          return (
            <SelectItem key={obj.id} value={obj.id.toString()}>
              {!formConfig.workspace
                ? `${workspace.name}: ${obj.name}`
                : obj.name}
            </SelectItem>
          );
        }
      })}
    </FieldSelect>
  );
}

export function FieldTag({
  formConfig,
  formState,
  tags,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
  tags: Tag[];
}) {
  // initial selected option is controlled using formState
  const inputName = "tags";
  const inputId = `${formConfig.formId}-input-${inputName}`;
  const labelText = "Tags";
  const defaultValue = Array.isArray(formState.data.tags)
    ? formState.data.tags?.map((i) => i.toString())
    : [];

  return (
    <article
      id={`${inputId}-article`}
      className="flex flex-col items-start justify-between gap-2"
    >
      <label htmlFor={`${inputId}`} className="border-b">
        {labelText}
      </label>

      <MultipleSelect
        id={inputId}
        name={inputName}
        disabled={formConfig.disableField?.tags}
        form={formConfig.formId}
        initialValue={defaultValue}
      >
        {tags.map((obj) => {
          const workspace = formConfig.userDataConfig?.workspaces.find(
            (o) => o.id === obj.workspace,
          );
          if (workspace) {
            return (
              <option key={obj.id} value={obj.id.toString()}>
                {!formConfig.workspace
                  ? `${workspace.name}: ${obj.name}`
                  : obj.name}
              </option>
            );
          }
        })}
      </MultipleSelect>
      {/* errors */}
      <ComponentError
        inputId={inputId}
        inputName={inputName}
        formState={formState}
      />
    </article>
  );
}

export function FieldEstimatedStartDate({
  formConfig,
  formState,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
}) {
  return (
    <FieldDate
      formState={formState}
      formConfig={formConfig}
      inputName="estimated_start_date"
    />
  );
}

export function FieldEstimatedEndDate({
  formConfig,
  formState,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
}) {
  return (
    <FieldDate
      formState={formState}
      formConfig={formConfig}
      inputName="estimated_end_date"
    />
  );
}

export function FieldStartDate({
  formConfig,
  formState,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
}) {
  return (
    <FieldDate
      formState={formState}
      formConfig={formConfig}
      inputName="actual_start_date"
    />
  );
}

export function FieldEndDate({
  formConfig,
  formState,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
}) {
  return (
    <FieldDate
      formState={formState}
      formConfig={formConfig}
      inputName="actual_end_date"
    />
  );
}

export function FieldEstimatedEffort({
  formConfig,
  formState,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
}) {
  const inputName = "estimated_effort";
  const defaultValue = formState?.data?.estimated_effort;
  const disabled = formConfig.disableField?.estimated_effort || false;
  const readonly = formConfig.readonlyField?.estimated_effort || false;
  const inputId = `${formConfig.formId}-input-${inputName}`;
  const labelText = "Estamated effort (days)";
  const placeholder = formConfig.disableField?.estimated_effort
    ? ""
    : "Estimated effort (in days) ...";

  return (
    <FieldNumberEffort
      formConfig={formConfig}
      formState={formState}
      inputId={inputId}
      inputName={inputName}
      defaultValue={defaultValue}
      disabled={disabled}
      readonly={readonly}
      labelText={labelText}
      placeholder={placeholder}
    />
  );
}

export function FieldActualEffort({
  formConfig,
  formState,
}: {
  formConfig: ProjectFormConfig;
  formState: ProjectFormState;
}) {
  const inputName = "actual_effort";
  const defaultValue = formState?.data?.actual_effort;
  const disabled = formConfig.disableField?.actual_effort || false;
  const readonly = formConfig.readonlyField?.actual_effort || false;
  const inputId = `${formConfig.formId}-input-${inputName}`;
  const labelText = "Actual effort (days)";
  const placeholder = formConfig.disableField?.actual_effort
    ? ""
    : "Actual effort (in days) ...";

  return (
    <FieldNumberEffort
      formConfig={formConfig}
      formState={formState}
      inputId={inputId}
      inputName={inputName}
      defaultValue={defaultValue}
      disabled={disabled}
      readonly={readonly}
      labelText={labelText}
      placeholder={placeholder}
    />
  );
}
