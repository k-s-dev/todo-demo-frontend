"use client";

import { Button } from "@/components/ui/button";
import { Workspace } from "../../definitions";
import Link from "next/link";

export default function WorkspaceDetailHeader({
  workspace,
}: {
  workspace: Workspace;
}) {
  return (
    <header className="flex flex-col sm:flex-row justify-between my-1 gap-2">
      <h2 className="text-left text-lg sm:text-xl">
        <span className="text-muted-foreground">Workspace: </span>
        <span className="">{workspace.name.toUpperCase()}</span>
      </h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Link href={`/workspace/${workspace.id}/update`}>
          <Button variant="outline" className="w-full">
            Edit
          </Button>
        </Link>
        <Link href={`/workspace/${workspace.id}/delete`}>
          <Button variant="outline" className="w-full">
            Delete
          </Button>
        </Link>
      </section>
    </header>
  );
}
