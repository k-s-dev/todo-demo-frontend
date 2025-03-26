"use client";

import { createContext, useContext, useReducer } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface Selection {
  id: number;
  checked: Checked;
}

export interface ISidebarState {
  showHidden: boolean;
  workspace: Selection[];
  category: Selection[];
  status: Selection[];
  priority: Selection[];
  tag: Selection[];
}

export type SidebarActionType =
  | { type: "setWorkspaceFilter"; payload: Selection }
  | { type: "setCategoryFilter"; payload: Selection }
  | { type: "setStatusFilter"; payload: Selection }
  | { type: "setPriorityFilter"; payload: Selection }
  | { type: "setTagFilter"; payload: Selection }
  | { type: "clearWorkspaceFilter" }
  | { type: "clearCategoryFilter" }
  | { type: "clearStatusFilter" }
  | { type: "clearPriorityFilter" }
  | { type: "clearTagFilter" }
  | { type: "toggleVisibility" };

const initialState: ISidebarState = {
  showHidden: false,
  workspace: [],
  category: [],
  status: [],
  priority: [],
  tag: [],
};

interface ISidebarContext {
  state: ISidebarState;
  dispatch: React.Dispatch<SidebarActionType>;
}

const SidebarContext = createContext<ISidebarContext>({
  state: initialState,
  dispatch: () => {},
});

export function useSidebarContext() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);
  return (
    <SidebarContext.Provider value={{ state, dispatch }}>
      {children}
    </SidebarContext.Provider>
  );
}

function sidebarReducer(
  sidebarState: ISidebarState,
  action: SidebarActionType,
): ISidebarState {
  switch (action.type) {
    case "setWorkspaceFilter": {
      if (
        sidebarState.workspace
          .map((state) => state.id)
          .includes(action.payload.id)
      ) {
        return {
          ...sidebarState,
          workspace: [
            ...sidebarState.workspace.filter(
              (state) => state.id !== action.payload.id,
            ),
          ],
        };
      }
      return {
        ...sidebarState,
        workspace: [...sidebarState.workspace, action.payload],
      };
    }

    case "setCategoryFilter": {
      if (
        sidebarState.category
          .map((state) => state.id)
          .includes(action.payload.id)
      ) {
        return {
          ...sidebarState,
          category: [
            ...sidebarState.category.filter(
              (state) => state.id !== action.payload.id,
            ),
          ],
        };
      }
      return {
        ...sidebarState,
        category: [...sidebarState.category, action.payload],
      };
    }

    case "setStatusFilter": {
      if (
        sidebarState.status.map((state) => state.id).includes(action.payload.id)
      ) {
        return {
          ...sidebarState,
          status: [
            ...sidebarState.status.filter(
              (state) => state.id !== action.payload.id,
            ),
          ],
        };
      }
      return {
        ...sidebarState,
        status: [...sidebarState.status, action.payload],
      };
    }

    case "setPriorityFilter": {
      if (
        sidebarState.priority
          .map((state) => state.id)
          .includes(action.payload.id)
      ) {
        return {
          ...sidebarState,
          priority: [
            ...sidebarState.priority.filter(
              (state) => state.id !== action.payload.id,
            ),
          ],
        };
      }
      return {
        ...sidebarState,
        priority: [...sidebarState.priority, action.payload],
      };
    }

    case "setTagFilter": {
      if (
        sidebarState.tag.map((state) => state.id).includes(action.payload.id)
      ) {
        return {
          ...sidebarState,
          tag: [
            ...sidebarState.tag.filter(
              (state) => state.id !== action.payload.id,
            ),
          ],
        };
      }
      return {
        ...sidebarState,
        tag: [...sidebarState.tag, action.payload],
      };
    }

    case "clearWorkspaceFilter": {
      return {
        ...sidebarState,
        workspace: [],
      };
    }

    case "clearCategoryFilter": {
      return {
        ...sidebarState,
        category: [],
      };
    }

    case "clearStatusFilter": {
      return {
        ...sidebarState,
        status: [],
      };
    }

    case "clearPriorityFilter": {
      return {
        ...sidebarState,
        priority: [],
      };
    }

    case "clearTagFilter": {
      return {
        ...sidebarState,
        tag: [],
      };
    }

    case "toggleVisibility": {
      return {
        ...sidebarState,
        showHidden: !sidebarState.showHidden,
      };
    }
  }
}
