"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useSidebarContext } from "@/lib/store/sidebarContext";
import { useEffect, useState } from "react";
import { UserDataConfig } from "@/lib/types";
import { Project } from "@/data/project/definitions";
import { Workspace } from "@/data/workspace/definitions";
import { Category } from "@/data/category/definitions";
import { Status as Status } from "@/data/status/definitions";
import { Priority as Priority } from "@/data/priority/definitions";
import { formatDate } from "@/lib/format";
import { updateProjectVisibility } from "../../actions/update";
import { Checkbox } from "@/components/ui/checkbox";
import FormModal from "@/data/FormModal";
import FormProjectDelete from "../../delete/Form";

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
  const initialProjects = projects.filter((pr) => pr.is_visible);

  const [projectsState, setProjectsState] =
    useState<Project[]>(initialProjects);

  useEffect(() => {
    let filteredProjects = projects;
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
      console.log(query);
      filteredProjects = filteredProjects.filter((obj) => {
        return (
          obj.title.toLowerCase().includes(query.toLowerCase()) ||
          obj.detail?.toLowerCase().includes(query)
        );
      });
    }
    setProjectsState([...filteredProjects]);
  }, [projects, sidebarContext, query]);

  if (!projectsState || projectsState.length === 0) {
    return <p>There are no visible projects. Check archive if needed.</p>;
  }

  return (
    <>
      <Table className="my-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%]">Title</TableHead>
            <TableHead className="w-[20%]">Parent</TableHead>
            <TableHead>Workspace</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[10%]">Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="w-[15%]">Due</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
            <TableHead>Toggle Visibility</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectsState.map((project) => {
            const workspace = userDataConfig.workspaces.find(
              (obj) => obj.id === project.workspace,
            );
            const category = userDataConfig.categories.find(
              (obj) => obj.id === project.category,
            );
            const priority = userDataConfig.priorities.find(
              (obj) => obj.id === project.priority,
            );
            const status = userDataConfig.statuses.find(
              (obj) => obj.id === project.status,
            );

            return (
              <ProjectTableRow
                userId={userId}
                key={project.id}
                project={project}
                parent={projects.find((pr) => pr.id === project.parent)}
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

function ProjectTableRow({
  userId,
  project,
  parent,
  workspace,
  category,
  status,
  priority,
}: {
  userId: string;
  project: Project;
  parent?: Project;
  workspace?: Workspace;
  category?: Category;
  status?: Status;
  priority?: Priority;
}) {
  const estimatedEndDateDisplay = project.estimated_end_date
    ? formatDate(new Date(project.estimated_end_date))
    : "-";

  return (
    <>
      <TableRow>
        <TableCell>
          <Link href={`/project/${project.id}`} className="link">
            {project.title}
          </Link>
        </TableCell>
        <TableCell>
          <Link href={`/project/${project.parent}`} className="link">
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
          <Link href={`/project/${project.id}/update`}>
            <FaPencil />
          </Link>
        </TableCell>
        <TableCell>
          <FormModal
            titleButton=""
            titleModal="Delete Project"
            triggerComponent={<FaTrash />}
          >
            <FormProjectDelete userId={userId} project={project} />
          </FormModal>
        </TableCell>
        <TableCell>
          <Checkbox
            checked={project.is_visible || false}
            onCheckedChange={() => {
              updateProjectVisibility(userId, project, {
                is_visible: !project.is_visible,
              });
            }}
          />
        </TableCell>
      </TableRow>
    </>
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
