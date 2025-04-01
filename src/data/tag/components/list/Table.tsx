"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Tag } from "../../definitions";
import { Workspace } from "@/data/workspace/definitions";
import FormModal from "@/data/FormModal";
import FormTagUpdate from "../../update/Form";
import FormTagDelete from "../../delete/Form";
import FormTagCreate from "../../create/Form";

export default function TagTable({
  userId,
  tags,
  workspaceId,
  workspaces,
}: {
  userId: string;
  tags: Tag[];
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
        <Body userId={userId} workspaces={workspaces} tags={tags} />
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
      <h5>Tags</h5>
      <FormModal titleButton="Create" titleModal="Create Tag">
        <FormTagCreate
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
  tags,
  workspaces,
}: {
  userId: string;
  tags: Tag[];
  workspaces: Workspace[];
}) {
  return (
    <TableBody>
      {tags.map((obj) => {
        return (
          <Row key={obj.id} userId={userId} tag={obj} workspaces={workspaces} />
        );
      })}
    </TableBody>
  );
}

function Row({
  userId,
  tag,
  workspaces,
}: {
  userId: string;
  tag: Tag;
  workspaces: Workspace[];
}) {
  return (
    <TableRow key={tag.id}>
      <TableCell className="">{tag.name}</TableCell>
      <TableCell align="right">
        <FormModal titleButton="Edit" titleModal="Edit Tag">
          <FormTagUpdate userId={userId} tag={tag} workspaces={workspaces} />
        </FormModal>
      </TableCell>
      <TableCell align="right">
        <FormModal titleButton="Delete" titleModal="Delete Tag">
          <FormTagDelete userId={userId} tag={tag} />
        </FormModal>
      </TableCell>
    </TableRow>
  );
}
