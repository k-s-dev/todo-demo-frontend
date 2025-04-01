"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Status } from "../../definitions";
import { Workspace } from "@/data/workspace/definitions";
import FormModal from "@/data/FormModal";
import FormStatusUpdate from "../../update/Form";
import FormStatusDelete from "../../delete/Form";
import FormStatusCreate from "../../create/Form";

export default function StatusTable({
  userId,
  workspaceId,
  workspaces,
  statuses,
}: {
  userId: string;
  workspaceId: number;
  workspaces: Workspace[];
  statuses: Status[];
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
        <Body userId={userId} workspaces={workspaces} statuses={statuses} />
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
      <h5>Statuses</h5>
      <FormModal titleButton="Create" titleModal="Create Status">
        <FormStatusCreate
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
  workspaces,
  statuses,
}: {
  userId: string;
  statuses: Status[];
  workspaces: Workspace[];
}) {
  return (
    <TableBody>
      {statuses.map((obj) => {
        return (
          <Row
            key={obj.id}
            userId={userId}
            status={obj}
            workspaces={workspaces}
          />
        );
      })}
    </TableBody>
  );
}

function Row({
  userId,
  workspaces,
  status,
}: {
  userId: string;
  status: Status;
  workspaces: Workspace[];
}) {
  return (
    <TableRow key={status.id}>
      <TableCell>
        <Link href={`/status/${status.id}`} className="underline">
          {status.name}
        </Link>
      </TableCell>
      <TableCell align="right">
        <FormModal titleButton="Edit" titleModal="Edit Status">
          <FormStatusUpdate
            userId={userId}
            status={status}
            workspaces={workspaces}
          />
        </FormModal>
      </TableCell>
      <TableCell align="right">
        <FormModal titleButton="Delete" titleModal="Delete Status">
          <FormStatusDelete userId={userId} status={status} />
        </FormModal>
      </TableCell>
    </TableRow>
  );
}
