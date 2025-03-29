"use client";

import { useSidebarContext } from "@/lib/store/sidebarContext";

import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import SelectDropdown from "./SelectDropdown";
import { UserDataConfig } from "@/lib/types";

export default function WorkspaceSelect({ userDataConfig }: PropsType) {
  const sidebarContext = useSidebarContext();

  const isSelectionEmpty = sidebarContext.state.workspace.length === 0;
  const selectionString = userDataConfig.workspaces
    .filter((ws) =>
      sidebarContext.state.workspace.map((state) => state.id).includes(ws.id),
    )
    .map((ws) => ws.name)
    .join(", ");

  return (
    <SelectDropdown
      isSelectionEmpty={isSelectionEmpty}
      selectionString={selectionString}
      title="Workspaces ..."
      clearAction={{ type: "clearWorkspaceFilter" }}
    >
      {userDataConfig.workspaces.map((obj) => {
        const checked = sidebarContext.state.workspace
          .map((state) => state.id)
          .includes(obj.id);
        return (
          <DropdownMenuCheckboxItem
            key={obj.id}
            checked={checked}
            onCheckedChange={() =>
              sidebarContext.dispatch({
                type: "setWorkspaceFilter",
                payload: { id: obj.id, checked: true },
              })
            }
            onSelect={(e) => e.preventDefault()}
          >
            {obj.name}
          </DropdownMenuCheckboxItem>
        );
      })}
    </SelectDropdown>
  );
}

interface PropsType {
  userDataConfig: UserDataConfig;
}
