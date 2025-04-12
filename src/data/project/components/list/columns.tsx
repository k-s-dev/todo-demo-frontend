"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { Project, ProjectTableData } from "../../definitions";
import { formatDate } from "@/lib/format";
import { FaPencil, FaTrash } from "react-icons/fa6";
import Link from "next/link";
import FormModal from "@/data/FormModal";
import FormProjectDelete from "../../delete/Form";
import { Checkbox } from "@/components/ui/checkbox";
import { updateProjectVisibility } from "../../actions/update";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const projectColumns: ColumnDef<ProjectTableData>[] = [
  {
    header: ({ column }) => createHeader("Title", column),
    accessorKey: "project.title",
    sortingFn: "alphanumeric",
    sortDescFirst: true,
  },
  {
    id: "priority",
    header: ({ column }) => createHeader("Priority", column),
    sortingFn: "alphanumeric",
    sortDescFirst: true,
    accessorKey: "priority.name",
    accessorFn: (originalRow) =>
      originalRow.priority ? originalRow.priority.name : "-",
    cell: (props) => {
      return props.row.original.priority ? (
        <span
          className={calcHighlightClass(
            props.row.original.priority?.order || 0,
          )}
        >
          {props.row.original.priority?.name || "-"}
        </span>
      ) : (
        "-"
      );
    },
  },
  {
    id: "status",
    header: ({ column }) => createHeader("Status", column),
    sortingFn: "alphanumeric",
    sortDescFirst: true,
    accessorKey: "status.name",
    accessorFn: (originalRow) =>
      originalRow.status ? originalRow.status.name : "-",
    cell: (props) => {
      return props.row.original.status ? (
        <span
          className={calcHighlightClass(props.row.original.status?.order || 0)}
        >
          {props.row.original.status?.name || "-"}
        </span>
      ) : (
        "-"
      );
    },
  },
  {
    id: "due",
    header: ({ column }) => createHeader("Due", column),
    accessorFn: (rowOriginal) => {
      return rowOriginal.project.estimated_end_date
        ? formatDate(new Date(rowOriginal.project.estimated_end_date))
        : "-";
    },
    sortingFn: "datetime",
    sortDescFirst: true,
  },
  {
    header: ({ column }) => createHeader("Parent", column),
    accessorKey: "parent.title",
    accessorFn: (originalRow) =>
      originalRow.parent?.title ? originalRow.parent.title : "-",
    sortingFn: "alphanumeric",
    sortDescFirst: true,
  },
  {
    header: ({ column }) => createHeader("Workspace", column),
    accessorKey: "workspace.name",
    sortingFn: "alphanumeric",
    sortDescFirst: true,
  },
  {
    header: ({ column }) => createHeader("Category", column),
    accessorKey: "category.name",
    sortingFn: "alphanumeric",
    sortDescFirst: true,
  },
  {
    header: "Edit",
    cell: (props) => (
      <Link href={`/project/${props.row.original.project.id}/update`}>
        <FaPencil />
      </Link>
    ),
  },
  {
    header: "Delete",
    cell: (props) => (
      <FormModal
        titleButton=""
        titleModal="Delete Project"
        triggerComponent={<FaTrash className="cursor-pointer" />}
      >
        <FormProjectDelete
          userId={props.row.original.userId}
          project={props.row.original.project as unknown as Project}
        />
      </FormModal>
    ),
  },
  {
    header: "Visibility",
    cell: (props) => (
      <Checkbox
        checked={props.row.original.project.is_visible}
        onCheckedChange={() => {
          updateProjectVisibility(
            props.row.original.userId,
            props.row.original.project,
            {
              is_visible: !props.row.original.project.is_visible,
            },
          );
        }}
      />
    ),
  },
];

function createHeader(
  title: string,
  column: Column<ProjectTableData, unknown>,
) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span className="font-bold">{title}</span>
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

function calcHighlightClass(order: number) {
  switch (order) {
    case 3:
      return "text-red-600";
    case 2:
      return "text-amber-600";
    case 1:
      return "text-lime-600";
    default:
      return "";
  }
}
