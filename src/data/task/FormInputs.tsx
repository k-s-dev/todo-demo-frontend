import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  TaskFormKeys,
  TaskFormState,
  TaskFormConfig,
  Task,
  TaskFormData,
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
import { Project } from "../project/definitions";
import { MultipleSelect } from "@/components/generic/MultipleSelect";

export function FormContent({
  formConfig,
  formState,
  isPending,
  projects,
  tasks,
}: {
  formConfig: TaskFormConfig;
  formState: TaskFormState;
  isPending: boolean;
  projects: Project[];
  tasks: Task[];
}) {
  let workspaces = formConfig.userDataConfig?.workspaces;
  let categories = formConfig.userDataConfig?.categories;
  let priorities = formConfig.userDataConfig?.priorities;
  let statuses = formConfig.userDataConfig?.statuses;
  let tags = formConfig.userDataConfig?.tags;
  let formProjects = [...projects];
  let formTasks = [...tasks];

  if (formConfig.selection?.workspace) {
    workspaces = workspaces?.filter(
      (w) => w.id === formConfig.selection?.workspace?.id,
    );
    categories = categories?.filter(
      (c) => c.workspace === formConfig.selection?.workspace?.id,
    );
    priorities = priorities?.filter(
      (o) => o.workspace === formConfig.selection?.workspace?.id,
    );
    statuses = statuses?.filter(
      (o) => o.workspace === formConfig.selection?.workspace?.id,
    );
    tags = tags?.filter(
      (o) => o.workspace === formConfig.selection?.workspace?.id,
    );
    formProjects = formProjects.filter(
      (o) => o.workspace === formConfig.selection?.workspace?.id,
    );
    formTasks = formTasks.filter(
      (o) => o.workspace === formConfig.selection?.workspace?.id,
    );
  }
  if (formConfig.selection?.category) {
    categories = categories?.filter(
      (c) => c.id === formConfig.selection?.category?.id,
    );
    formProjects = formProjects.filter(
      (o) => o.category === formConfig.selection?.category?.id,
    );
    formTasks = formTasks.filter(
      (o) => o.category === formConfig.selection?.category?.id,
    );
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
          <FieldProject
            formState={formState}
            formConfig={formConfig}
            projects={formProjects}
          />
          <FieldParent
            formState={formState}
            formConfig={formConfig}
            tasks={formTasks}
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
        disabled={formConfig.disable?.form || false}
      />
    </section>
  );
}

export function ErrorEl({ text }: { text: string }) {
  return <p className="mt-4 text-sm text-red-700 dark:text-red-300">{text}</p>;
}

export function FormErrors({ formState }: { formState: TaskFormState }) {
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
  formState: TaskFormState | undefined;
  inputId: string;
  inputName: TaskFormKeys;
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
  inputName: TaskFormKeys;
  defaultValue: string | undefined;
  objectKey?: keyof TaskFormData;
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
  inputName: TaskFormKeys;
  objectKey?: keyof TaskFormData;
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
    formConfig.disable &&
    typeof formConfig.disable[objectKey] === "boolean"
  ) {
    disabled = formConfig.disable[objectKey] || false;
  }
  if (
    formConfig.readonly &&
    typeof formConfig.readonly[objectKey] === "boolean"
  ) {
    readonly = formConfig.readonly[objectKey] || false;
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
          defaultValue={defaultValue as undefined}
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
  inputName: TaskFormKeys;
  defaultValue?: number;
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
}) {
  const inputName = "title";
  const defaultValue = formState?.data?.title;
  const disabled = formConfig.disable?.title || false;
  const readonly = formConfig.readonly?.title || false;
  const placeholder = formConfig.disable?.title ? "" : "Title...";
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
}) {
  const inputName = "detail";
  const defaultValue = formState?.data?.detail;
  const disabled = formConfig.disable?.detail || false;
  const readonly = formConfig.readonly?.detail || false;
  const labelText = "Detail";
  const placeholder = formConfig.disable?.detail ? "" : "Detail...";
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
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
          disabled={formConfig.disable?.is_visible || false}
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
  workspaces: Workspace[];
}) {
  // initial selected option is controlled using formState
  let defaultValue = formState.data.workspace?.toString();
  if (formConfig.selection?.workspace) {
    defaultValue = formConfig.selection?.workspace.id.toString();
  }
  return (
    <FieldSelect
      formState={formState}
      formConfig={formConfig}
      inputName="workspace"
      defaultValue={defaultValue}
      disabled={formConfig.disable?.workspace}
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
  categories: Category[];
}) {
  // initial selected option is controlled using formState
  let defaultValue = formState.data.category?.toString();
  if (formConfig.selection?.category) {
    defaultValue = formConfig.selection?.category.id.toString();
  }
  return (
    <FieldSelect
      formState={formState}
      formConfig={formConfig}
      inputName="category"
      defaultValue={defaultValue}
      disabled={formConfig.disable?.category}
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
              {!formConfig.selection?.workspace
                ? `${workspace.name}: ${obj.name}`
                : obj.name}
            </SelectItem>
          );
        }
      })}
    </FieldSelect>
  );
}

export function FieldProject({
  formConfig,
  formState,
  projects,
}: {
  formConfig: TaskFormConfig;
  formState: TaskFormState;
  projects: Project[];
}) {
  // initial selected option is controlled using formState
  let defaultValue = formState.data.project?.toString();
  if (formConfig.project) {
    defaultValue = formConfig.project.id.toString();
  }
  return (
    <FieldSelect
      formState={formState}
      formConfig={formConfig}
      inputName="project"
      defaultValue={defaultValue}
      disabled={formConfig.disable?.project}
    >
      {projects.map((obj) => {
        const workspace = formConfig.userDataConfig?.workspaces.find(
          (o) => o.id === obj.workspace,
        );
        if (workspace) {
          // for ts error as find can return undefined
          return (
            <SelectItem key={obj.id} value={obj.id.toString()}>
              {!formConfig.selection?.workspace
                ? `${workspace.name}: ${obj.title}`
                : obj.title}
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
  tasks,
  task,
}: {
  formConfig: TaskFormConfig;
  formState: TaskFormState;
  tasks: Task[];
  task?: Task;
}) {
  // initial selected option is controlled using formState
  let defaultValue = formState.data.parent?.toString();
  if (task) {
    defaultValue = task.id.toString();
  }
  const children = tasks.map((obj) => {
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
          {!formConfig.selection?.workspace && !formConfig.selection?.category
            ? `ws: ${workspace.name} | cat: ${category.name} | ${obj.title}`
            : formConfig.selection?.workspace && !formConfig.selection?.category
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
      disabled={formConfig.disable?.parent}
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
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
      disabled={formConfig.disable?.priority}
    >
      {priorities.map((obj) => {
        const workspace = formConfig.userDataConfig?.workspaces.find(
          (o) => o.id === obj.workspace,
        );
        if (workspace) {
          return (
            <SelectItem key={obj.id} value={obj.id.toString()}>
              {!formConfig.selection?.workspace
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
  statuses: Status[];
}) {
  // initial selected option is controlled using formState
  const defaultValue = formState.data.status?.toString();
  const disabled = formConfig.disable?.status;

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
              {!formConfig.selection?.workspace
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
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
        disabled={formConfig.disable?.tags}
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
                {!formConfig.selection?.workspace
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
}) {
  const inputName = "estimated_effort";
  const defaultValue = formState?.data?.estimated_effort;
  const disabled = formConfig.disable?.estimated_effort || false;
  const readonly = formConfig.readonly?.estimated_effort || false;
  const inputId = `${formConfig.formId}-input-${inputName}`;
  const labelText = "Estamated effort (days)";
  const placeholder = formConfig.disable?.estimated_effort
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
  formConfig: TaskFormConfig;
  formState: TaskFormState;
}) {
  const inputName = "actual_effort";
  const defaultValue = formState?.data?.actual_effort;
  const disabled = formConfig.disable?.actual_effort || false;
  const readonly = formConfig.readonly?.actual_effort || false;
  const inputId = `${formConfig.formId}-input-${inputName}`;
  const labelText = "Actual effort (days)";
  const placeholder = formConfig.disable?.actual_effort
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
