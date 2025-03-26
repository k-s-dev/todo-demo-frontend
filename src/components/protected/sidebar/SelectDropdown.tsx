"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarActionType, useSidebarContext } from "@/lib/store/sidebarContext";


export default function SelectDropdown({
  isSelectionEmpty,
  selectionString,
  title,
  clearAction,
  children,
}: {
  isSelectionEmpty: boolean;
  selectionString: string;
  title: string;
  clearAction: SidebarActionType;
  children: React.ReactNode;
}) {
  const sidebarContext = useSidebarContext();

  return (
    <>
      <p>{!isSelectionEmpty && <>Selection: {selectionString}</>}</p>
      <DropdownMenu>
        <div className="flex flex-col gap-2 justify-around sm:flex-row">
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="justify-start sm:basis-52">
              <span className="text-muted-foreground">Select: </span>{" "}
              <span className="font-bold">{title}</span>
            </Button>
          </DropdownMenuTrigger>
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              sidebarContext.dispatch(clearAction);
            }}
          >
            Clear
          </Button>
        </div>
        <DropdownMenuContent className="w-56">
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
