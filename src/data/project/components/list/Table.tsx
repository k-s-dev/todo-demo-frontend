"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

import { DataTable } from "@/components/generic/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserDataConfig } from "@/lib/types";
import { Project, ProjectTableData } from "@/data/project/definitions";
import { Workspace } from "@/data/workspace/definitions";
import { Category } from "@/data/category/definitions";
import { projectColumns } from "./columns";
import { useSidebarContext } from "@/lib/store/sidebarContext";

export default function ProjectTable({
  userId,
  userDataConfig,
  projects,
  query,
}: {
  userId: string;
  userDataConfig: UserDataConfig;
  projects: Project[];
  query?: string;
}) {
  const sidebarContext = useSidebarContext();
  const initialProjects = [...projects.filter((pr) => pr.is_visible)];

  const [projectsState, setProjectsState] =
    useState<Project[]>(initialProjects);

  useEffect(() => {
    let filteredProjects = [...projects];
    if (!sidebarContext.state.showHidden) {
      filteredProjects = filteredProjects.filter((pr) => pr.is_visible);
    }
    filteredProjects = applyFilter(
      filteredProjects,
      sidebarContext.state.workspace,
      "workspace",
    );
    filteredProjects = applyFilter(
      filteredProjects,
      sidebarContext.state.category,
      "category",
    );
    filteredProjects = applyFilter(
      filteredProjects,
      sidebarContext.state.status,
      "status",
    );
    filteredProjects = applyFilter(
      filteredProjects,
      sidebarContext.state.priority,
      "priority",
    );
    filteredProjects = applyFilter(
      filteredProjects,
      sidebarContext.state.tag,
      "tags",
    );
    if (query && query.length > 0) {
      filteredProjects = [
        ...filteredProjects.filter((obj) => {
          return (
            obj.title.toLowerCase().includes(query.toLowerCase()) ||
            obj.detail?.toLowerCase().includes(query.toLowerCase())
          );
        }),
      ];
    }
    setProjectsState([...filteredProjects]);
  }, [sidebarContext, query, projects]);

  if (!projectsState || projectsState.length === 0) {
    return (
      <section>
        <Header />
        <Separator />
        <p>There are no visible projects. Check archive if needed.</p>
      </section>
    );
  }

  const tableData = createTableData(userId, userDataConfig, projectsState);

  return (
    <section>
      <Header />
      <DataTable key="projects" columns={projectColumns} data={tableData} />
    </section>
  );
}

function applyFilter(
  data: Project[],
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
  return [...filteredData];
}

function createTableData(
  userId: string,
  userDataConfig: UserDataConfig,
  projects: Project[],
): ProjectTableData[] {
  const projectTableData = projects.map((project) => {
    return {
      userId,
      project,
      parent: projects.find((obj) => obj.id === project.parent),
      workspace: userDataConfig.workspaces.find(
        (obj) => obj.id === project.workspace,
      ) as Workspace,
      category: userDataConfig.categories.find(
        (obj) => obj.id === project.category,
      ) as Category,
      status: userDataConfig.statuses.find((obj) => obj.id === project.status),
      priority: userDataConfig.priorities.find(
        (obj) => obj.id === project.priority,
      ),
    };
  });

  return [...projectTableData];
}

function Header() {
  return (
    <header className="flex justify-between my-4">
      <h4>Projects</h4>
      <Link href="/project/create">
        <Button>
          <FaPlus />
        </Button>
      </Link>
    </header>
  );
}
