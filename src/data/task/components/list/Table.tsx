"use client";

import Link from "next/link";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useSidebarContext } from "@/lib/store/sidebarContext";
import { UserDataConfig } from "@/lib/types";
import { Task } from "@/data/task/definitions";
import { Workspace } from "@/data/workspace/definitions";
import { Category } from "@/data/category/definitions";
import { Status as Status } from "@/data/status/definitions";
import { Priority as Priority } from "@/data/priority/definitions";
import { formatDate } from "@/lib/format";
import { updateTaskVisibility } from "../../actions/update";
import FormTaskDelete from "../../delete/Form";
import FormModal from "@/data/FormModal";

export default function TaskTable({
  userId,
  userDataConfig,
  tasks,
  query,
}: {
  userId: string;
  userDataConfig: UserDataConfig;
  tasks: Task[];
  query: string;
}) {
  const sidebarContext = useSidebarContext();
  const initialTasks = tasks.filter((pr) => pr.is_visible);

  const [tasksState, setTasksState] = useState<Task[]>(initialTasks);

  useEffect(() => {
    let filteredTasks = tasks;
    if (!sidebarContext.state.showHidden) {
      filteredTasks = filteredTasks.filter((pr) => pr.is_visible);
    }
    filteredTasks = applyFilter(
      filteredTasks,
      sidebarContext.state.workspace,
      "workspace",
    );
    filteredTasks = applyFilter(
      filteredTasks,
      sidebarContext.state.category,
      "category",
    );
    filteredTasks = applyFilter(
      filteredTasks,
      sidebarContext.state.status,
      "status",
    );
    filteredTasks = applyFilter(
      filteredTasks,
      sidebarContext.state.priority,
      "priority",
    );
    filteredTasks = applyFilter(
      filteredTasks,
      sidebarContext.state.tag,
      "tags",
    );
    if (query && query.length > 0) {
      console.log(query);
      filteredTasks = filteredTasks.filter((obj) => {
        return (
          obj.title.toLowerCase().includes(query.toLowerCase()) ||
          obj.detail?.toLowerCase().includes(query)
        );
      });
    }
    setTasksState([...filteredTasks]);
  }, [tasks, sidebarContext, query]);

  if (!tasksState || tasksState.length === 0) {
    return <p>There are no visible tasks. Check archive if needed.</p>;
  }

  return (
    <>
      <Table className="my-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%]">Title</TableHead>
            <TableHead className="w-[15%]">Parent</TableHead>
            <TableHead>Workspace</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[10%]">Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="w-[10%]">Due</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
            <TableHead>Toggle Visibility</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasksState.map((task) => {
            const workspace = userDataConfig.workspaces.find(
              (obj) => obj.id === task.workspace,
            );
            const category = userDataConfig.categories.find(
              (obj) => obj.id === task.category,
            );
            const priority = userDataConfig.priorities.find(
              (obj) => obj.id === task.priority,
            );
            const status = userDataConfig.statuses.find(
              (obj) => obj.id === task.status,
            );

            return (
              <TaskTableRow
                userId={userId}
                key={task.id}
                task={task}
                parent={tasks.find((pr) => pr.id === task.parent)}
                workspace={workspace}
                category={category}
                priority={priority}
                status={status}
              />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

function TaskTableRow({
  userId,
  task,
  parent,
  workspace,
  category,
  status,
  priority,
}: {
  userId: string;
  task: Task;
  parent?: Task;
  workspace?: Workspace;
  category?: Category;
  status?: Status;
  priority?: Priority;
}) {
  const estimatedEndDateDisplay = task.estimated_end_date
    ? formatDate(new Date(task.estimated_end_date))
    : "-";

  return (
    <>
      <TableRow>
        <TableCell>
          <Link href={`/task/${task.id}`} className="link">
            {task.title}
          </Link>
        </TableCell>
        <TableCell>
          <Link href={`/task/${task.parent}`} className="link">
            {parent?.title || "-"}
          </Link>
        </TableCell>
        <TableCell className="capitalize">
          <Link href={`/workspace/${workspace?.id}`} className="link">
            {workspace?.name}
          </Link>
        </TableCell>
        <TableCell className="capitalize">{category?.name}</TableCell>
        <TableCell className={calcHighlightClass(status?.order || 0)}>
          {status?.name}
        </TableCell>
        <TableCell className={calcHighlightClass(priority?.order || 0)}>
          {priority?.name}
        </TableCell>
        <TableCell>{estimatedEndDateDisplay}</TableCell>
        <TableCell>
          <Link href={`/task/${task.id}/update`}>
            <FaPencil />
          </Link>
        </TableCell>
        <TableCell>
          <FormModal
            titleButton=""
            titleModal="Delete Project"
            triggerComponent={<FaTrash />}
          >
            <FormTaskDelete userId={userId} task={task} />
          </FormModal>
        </TableCell>
        <TableCell>
          <Checkbox
            checked={task.is_visible || false}
            onCheckedChange={() => {
              updateTaskVisibility(userId, task, {
                is_visible: !task.is_visible,
              });
            }}
          />
        </TableCell>
      </TableRow>
    </>
  );
}

function applyFilter(
  data: Task[],
  filterState: Array<{ id: number }>,
  filterName: "workspace" | "category" | "priority" | "status" | "tags",
) {
  const selectedIds = filterState.map((state) => state.id);
  if (selectedIds.length === 0) return data;
  const filteredData = data.filter((obj) => {
    const actualId = obj[filterName];
    if (typeof actualId === "number") {
      if (selectedIds.includes(actualId)) return true;
    }
    if (Array.isArray(actualId)) {
      actualId.forEach((id) => {
        if (selectedIds.includes(id)) return true;
      });
    }
    return false;
  });
  return filteredData;
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
