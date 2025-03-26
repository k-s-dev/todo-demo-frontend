"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UserDataConfig } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Workspace } from "../../definitions";
import { deleteWorkspaces } from "../../actions/deleteWorkspace";
import { Separator } from "@/components/ui/separator";

export default function WorkspaceList({
  userId,
  userDataConfig,
}: {
  userId: string;
  userDataConfig: UserDataConfig;
}) {
  return (
    <>
      {userDataConfig.workspaces && userDataConfig.workspaces.length > 0 && (
        <WorkspaceListContent userId={userId} userDataConfig={userDataConfig} />
      )}
      {!userDataConfig.workspaces ||
        (userDataConfig.workspaces.length <= 0 && (
          <p>There are no workspaces.</p>
        ))}
    </>
  );
}

function WorkspaceListContent({
  userId,
  userDataConfig,
}: {
  userId: string;
  userDataConfig: UserDataConfig;
}) {
  const [selections, setSelections] = useState<Set<number>>(new Set());

  function handleCheckboxChange(workspace: Workspace) {
    if (selections.has(workspace.id)) {
      setSelections((p) => {
        const n = new Set(p);
        n.delete(workspace.id);
        return n;
      });
    } else {
      setSelections((p) => {
        const n = new Set(p);
        n.add(workspace.id);
        return n;
      });
    }
  }

  function handleDeleteSelectedClick(userId: string) {
    if (selections.size !== 0) {
      deleteWorkspaces(userId, new Array(...selections), "/workspace");
    }
  }

  function handleToggleAll(workspaces: Workspace[]) {
    workspaces.forEach((obj) => {
      setSelections((p) => {
        const n = new Set(p);
        if (n.has(obj.id)) {
          n.delete(obj.id);
          return n;
        } else {
          n.add(obj.id);
          return n;
        }
      });
    });
  }

  return (
    <>
      <section className="my-4 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <Button
          variant="outline"
          onClick={() => handleToggleAll(userDataConfig.workspaces)}
        >
          Toggle all selections
        </Button>
        <Button
          variant="outline"
          onClick={() => handleDeleteSelectedClick(userId)}
        >
          Delete Selected
        </Button>
      </section>
      <Separator />
      <section
        id="workspace-list"
        className="my-8 flex flex-col gap-2"
      >
        {userDataConfig.workspaces.map((ws) => (
          <article
            key={ws.id}
            id="workspace-list-row"
            className="grid grid-cols-[1fr_5fr_5fr_5fr] items-center gap-2"
          >
            <Checkbox
              className=""
              checked={selections.has(ws.id)}
              onCheckedChange={() => handleCheckboxChange(ws)}
            />
            <Link href={`/workspace/${ws.id}`} className="w-full">
              <Button
                variant="outline"
                className={cn(
                  "w-full",
                  ws.is_default && "text-lime-800 dark:text-amber-300",
                )}
              >
                {ws.name}
              </Button>
            </Link>
            <Link href={`/workspace/${ws.id}/update`} className="w-full">
              <Button variant="outline" className="w-full">
                Edit
              </Button>
            </Link>
            <Link href={`/workspace/${ws.id}/delete`} className="w-full">
              <Button variant="outline" className="w-full">
                Delete
              </Button>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
