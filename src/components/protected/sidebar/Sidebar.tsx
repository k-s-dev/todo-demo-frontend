"use client";

import { Separator } from "@/components/ui/separator";
import CategorySelect from "./CategorySelect";
import StatusSelect from "./StatusSelect";
import WorkspaceSelect from "./WorkspaceSelect";
import PrioritySelect from "./PrioritySelect";
import TagSelect from "./TagSelect";
import VisibilityToggle from "./VisibilityToggle";
import { UserDataConfig } from "@/lib/types";

export default function Sidebar({ userDataConfig }: PropsType) {
  return (
    <aside className="border-r mx-4 px-2">
      <div className="flex flex-col gap-2 my-2">
        <VisibilityToggle />
        <Separator />
        <h6>Filters</h6>
        <Separator />
        <WorkspaceSelect userDataConfig={userDataConfig} />
        <Separator />
        <CategorySelect userDataConfig={userDataConfig} />
        <Separator />
        <StatusSelect userDataConfig={userDataConfig} />
        <Separator />
        <PrioritySelect userDataConfig={userDataConfig} />
        <Separator />
        <TagSelect userDataConfig={userDataConfig} />
        <Separator />
      </div>
    </aside>
  );
}

interface PropsType {
  userDataConfig: UserDataConfig;
}
