"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Priority } from "../../definitions";
import { Workspace } from "@/data/workspace/definitions";
import FormModal from "@/data/FormModal";
import FormPriorityUpdate from "../../update/Form";
import FormPriorityDelete from "../../delete/Form";
import FormPriorityCreate from "../../create/Form";

export default function PriorityTable({
  userId,
  priorities,
  workspaceId,
  workspaces,
}: {
  userId: string;
  priorities: Priority[];
  workspaceId: number;
  workspaces: Workspace[];
}) {
  return (
    <article className="border rounded-2xl shadow shadow-gray-500 px-2">
      <Header
        userId={userId}
        workspaces={workspaces}
        workspaceId={workspaceId}
      />
      <Separator className="h-0.5! my-2" />
      <Table align="center">
        <Body userId={userId} workspaces={workspaces} priorities={priorities} />
      </Table>
    </article>
  );
}

function Header({
  userId,
  workspaceId,
  workspaces,
}: {
  userId: string;
  workspaceId: number;
  workspaces: Workspace[];
}) {
  return (
    <header className="my-2 flex flex-col justify-start items-start md:justify-between md:flex-row gap-4">
      <h5>Priorities</h5>
      <FormModal titleButton="Create" titleModal="Create Priority">
        <FormPriorityCreate
          userId={userId}
          workspaceId={workspaceId}
          workspaces={workspaces}
        />
      </FormModal>
    </header>
  );
}

function Body({
  userId,
  priorities,
  workspaces,
}: {
  userId: string;
  priorities: Priority[];
  workspaces: Workspace[];
}) {
  return (
    <TableBody>
      {priorities.map((obj) => {
        return (
          <Row
            key={obj.id}
            userId={userId}
            priority={obj}
            workspaces={workspaces}
          />
        );
      })}
    </TableBody>
  );
}

function Row({
  userId,
  priority,
  workspaces,
}: {
  userId: string;
  priority: Priority;
  workspaces: Workspace[];
}) {
  return (
    <TableRow key={priority.id}>
      <TableCell className="">{priority.name}</TableCell>
      <TableCell align="right">
        <FormModal titleButton="Edit" titleModal="Edit Priority">
          <FormPriorityUpdate
            userId={userId}
            priority={priority}
            workspaces={workspaces}
          />
        </FormModal>
      </TableCell>
      <TableCell align="right">
        <FormModal titleButton="Delete" titleModal="Delete Priority">
          <FormPriorityDelete userId={userId} priority={priority} />
        </FormModal>
      </TableCell>
    </TableRow>
  );
}
