import { fetchUserDataConfig } from "@/data/apiUserData";
import { Category } from "@/data/category/definitions";
import { Project } from "@/data/project/definitions";
import { Workspace } from "@/data/workspace/definitions";

export interface LinkType {
  id: string;
  href: string;
  text: string;
}

export type UserDataConfig = Awaited<ReturnType<typeof fetchUserDataConfig>>;

export type FormStateType = {
  message?: string | null;
  errors?: {
    [k: string]: string[];
  };
};

export type FormFieldsIndicator<Form> = {
  [Property in keyof Form | "form"]?: boolean;
};

export interface FormConfig<FormFieldsIndicator> {
  userDataConfig: UserDataConfig;
  formId?: string;
  selection?: {
    workspace?: Workspace;
    category?: Category;
    project?: Project;
  };
  disable?: FormFieldsIndicator;
  readonly?: FormFieldsIndicator;
  excludeLabel?: FormFieldsIndicator;
}
