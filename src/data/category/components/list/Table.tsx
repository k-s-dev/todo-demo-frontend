"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Category } from "../../definitions";
import { Workspace } from "@/data/workspace/definitions";
import FormModal from "@/data/FormModal";
import FormCategoryUpdate from "../../update/Form";
import FormCategoryDelete from "../../delete/Form";
import FormCategoryCreate from "../../create/Form";

export default function CategoryTable({
  userId,
  categories,
  workspaceId,
  workspaces,
}: {
  userId: string;
  categories: Category[];
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
        <Body userId={userId} workspaces={workspaces} categories={categories} />
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
      <h5>Categories</h5>
      <FormModal titleButton="Create" titleModal="Create Category">
        <FormCategoryCreate
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
  categories,
  workspaces,
}: {
  userId: string;
  categories: Category[];
  workspaces: Workspace[];
}) {
  return (
    <TableBody>
      {categories.map((obj) => {
        return (
          <Row
            key={obj.id}
            userId={userId}
            category={obj}
            workspaces={workspaces}
          />
        );
      })}
    </TableBody>
  );
}

function Row({
  userId,
  category,
  workspaces,
}: {
  userId: string;
  category: Category;
  workspaces: Workspace[];
}) {
  return (
    <TableRow key={category.id}>
      <TableCell>
        <Link href={`/category/${category.id}`} className="underline">
          {category.name}
        </Link>
      </TableCell>
      <TableCell align="right">
        <FormModal titleButton="Edit" titleModal="Edit Category">
          <FormCategoryUpdate
            userId={userId}
            category={category}
            workspaces={workspaces}
          />
        </FormModal>
      </TableCell>
      <TableCell align="right">
        <FormModal titleButton="Delete" titleModal="Delete Category">
          <FormCategoryDelete userId={userId} category={category} />
        </FormModal>
      </TableCell>
    </TableRow>
  );
}
