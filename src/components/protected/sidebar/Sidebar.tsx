"use client";

import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import VisibilityToggle from "./VisibilityToggle";
import CategorySelect from "./CategorySelect";
import StatusSelect from "./StatusSelect";
import WorkspaceSelect from "./WorkspaceSelect";
import PrioritySelect from "./PrioritySelect";
import TagSelect from "./TagSelect";
import { UserDataConfig } from "@/lib/types";

export default function Sidebar({ userDataConfig }: PropsType) {
  return (
    <>
      <aside className="hidden sm:block">
        <SidebarContent userDataConfig={userDataConfig} />
      </aside>

      <aside className="sm:hidden block m-2 sticky top-40 z-10 bg-white dark:bg-slate-700">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <span className="text-muted-foreground">Filters</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="">
            <SidebarContent userDataConfig={userDataConfig} />
          </DropdownMenuContent>
        </DropdownMenu>
      </aside>
    </>
  );
}

export function SidebarContent({ userDataConfig }: PropsType) {
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
