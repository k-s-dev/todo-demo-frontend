"use client";

import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { useSidebarContext } from "@/lib/store/sidebarContext";
import SelectDropdown from "./SelectDropdown";
import SelectionText from "./SelectionText";
import { UserDataConfig } from "@/lib/types";

export default function StatusSelect({ userDataConfig }: PropsType) {
  const sidebarContext = useSidebarContext();

  const selectedWorkspaces = userDataConfig.workspaces.filter((ws) =>
    sidebarContext.state.workspace.map((state) => state.id).includes(ws.id),
  );
  let filteredObjects;
  const isWorkspaceSelected = sidebarContext.state.workspace.length !== 0;

  if (isWorkspaceSelected) {
    filteredObjects = userDataConfig.statuses.filter((obj) =>
      selectedWorkspaces.map((ws) => ws.id).includes(obj.workspace),
    );
  } else {
    filteredObjects = userDataConfig.statuses;
  }

  const isSelectionEmpty = sidebarContext.state.status.length === 0;

  const selectionString = filteredObjects
    .filter((cat) =>
      sidebarContext.state.status.map((state) => state.id).includes(cat.id),
    )
    .map((cat) => cat.name)
    .join(", ");

  return (
    <SelectDropdown
      isSelectionEmpty={isSelectionEmpty}
      selectionString={selectionString}
      title="Statuses ..."
      clearAction={{ type: "clearStatusFilter" }}
    >
      {filteredObjects.map((obj) => {
        const workspace = userDataConfig.workspaces.find(
          (ws) => ws.id === obj.workspace,
        );
        const checked = sidebarContext.state.status
          .map((state) => state.id)
          .includes(obj.id);

        return (
          <DropdownMenuCheckboxItem
            key={obj.id}
            checked={checked}
            onCheckedChange={() =>
              sidebarContext.dispatch({
                type: "setStatusFilter",
                payload: { id: obj.id, checked: true },
              })
            }
            onSelect={(e) => e.preventDefault()}
          >
            <SelectionText objName={obj.name} workspaceName={workspace?.name} />
          </DropdownMenuCheckboxItem>
        );
      })}
    </SelectDropdown>
  );
}

interface PropsType {
  userDataConfig: UserDataConfig;
}
