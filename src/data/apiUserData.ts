"use server";

import { baseUrl, getBaseOptions } from "@/lib/apiConfig";
import { Category as Category } from "./category/definitions";
import { Priority as Priority } from "./priority/definitions";
import { Project } from "./project/definitions";
import { Status } from "./status/definitions";
import { Tag } from "./tag/definitions";
import { Task } from "./task/definitions";
import { Workspace } from "./workspace/definitions";

export async function fetchUserDataConfig(userId: string) {
  const workspaces = await fetchAllUserObjects<Workspace>(userId, "workspace");
  const categories = await fetchAllUserObjects<Category>(userId, "category");
  const priorities = await fetchAllUserObjects<Priority>(userId, "priority");
  const statuses = await fetchAllUserObjects<Status>(userId, "status");
  const tags = await fetchAllUserObjects<Tag>(userId, "tag");

  const userDataConfig = await Promise.all([
    workspaces,
    categories,
    priorities,
    statuses,
    tags,
  ]).then(([workspaces, categories, priorities, statuses, tags]) => {
    return {
      workspaces,
      categories,
      priorities,
      statuses,
      tags,
    };
  });

  return userDataConfig;
}

export async function fetchAllUserObjects<ObjectType>(
  userId: string,
  endpoint: Endpoint,
): Promise<ObjectType[]> {
  const wsUrl = `${baseUrl}/user/${userId}/${endpoint}/`;
  const response = await fetch(wsUrl, getBaseOptions);
  const data = await response.json();

  return data;
}

export async function fetchSpecificObject<ObjectType>(
  url: string,
): Promise<ObjectType> {
  const response = await fetch(url, getBaseOptions);
  const data = await response.json();
  return data;
}

type Endpoint =
  | "workspace"
  | "category"
  | "status"
  | "priority"
  | "tag"
  | "project"
  | "task";
