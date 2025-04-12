"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

import { useSidebarContext } from "@/lib/store/sidebarContext";
import { UserDataConfig } from "@/lib/types";
import { Task, TaskTableData } from "@/data/task/definitions";
import { Workspace } from "@/data/workspace/definitions";
import { Category } from "@/data/category/definitions";
import { Project } from "@/data/project/definitions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/generic/data-table";
import { taskColumns } from "./columns";

export default function TaskTable({
  userId,
  userDataConfig,
  projects,
  tasks,
  query,
}: {
  userId: string;
  userDataConfig: UserDataConfig;
  projects: Project[];
  tasks: Task[];
  query?: string;
}) {
  const sidebarContext = useSidebarContext();
  const [tasksState, setTasksState] = useState<Task[]>([...tasks]);

  useEffect(() => {
    let filteredTasks = [...tasks];
    if (!sidebarContext.state.showHidden) {
      filteredTasks = filteredTasks.filter((obj) => obj.is_visible);
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
      filteredTasks = filteredTasks.filter((obj) => {
        return (
          obj.title.toLowerCase().includes(query.toLowerCase()) ||
          obj.detail?.toLowerCase().includes(query.toLowerCase())
        );
      });
    }
    setTasksState([...filteredTasks]);
  }, [sidebarContext, query, tasks]);

  if (!tasksState || tasksState.length === 0) {
    return (
      <section>
        <Header />
        <Separator />
        <p>There are no visible tasks. Check hidden items if needed.</p>
      </section>
    );
  }

  const tableData = createTableData(
    userId,
    userDataConfig,
    projects,
    tasksState,
  );

  return (
    <section>
      <Header />
      <DataTable key="tasks" columns={taskColumns} data={tableData} />
    </section>
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
      return selectedIds.includes(actualId);
    }
    if (Array.isArray(actualId)) {
      return actualId.some((id) => selectedIds.includes(id));
    }
    return false;
  });
  return [...filteredData];
}

function createTableData(
  userId: string,
  userDataConfig: UserDataConfig,
  projects: Project[],
  tasks: Task[],
): TaskTableData[] {
  const taskTableData = tasks.map((task) => {
    return {
      userId,
      task,
      parent: tasks.find((obj) => obj.id === task.parent),
      workspace: userDataConfig.workspaces.find(
        (obj) => obj.id === task.workspace,
      ) as Workspace,
      category: userDataConfig.categories.find(
        (obj) => obj.id === task.category,
      ) as Category,
      project: projects.find((obj) => obj.id === task.project) as Project,
      status: userDataConfig.statuses.find((obj) => obj.id === task.status),
      priority: userDataConfig.priorities.find(
        (obj) => obj.id === task.priority,
      ),
    };
  });

  return taskTableData;
}

function Header() {
  return (
    <header className="flex justify-between my-4">
      <h4>Tasks</h4>
      <Link href="/task/create">
        <Button>
          <FaPlus />
        </Button>
      </Link>
    </header>
  );
}
