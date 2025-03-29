"use server";

import { apiCreate, Endpoint } from "@/data/apiCRUD";
import { revalidateTag } from "next/cache";

export async function createWorkspaceConfigTemplate(
  userId: string,
  workspaceId: string,
) {
    createStatusesTemplate(userId, workspaceId);
    createPrioritiesTemplate(userId, workspaceId);
    revalidateTag("user-data")
}

export async function createStatusesTemplate(
  userId: string,
  workspaceId: string,
) {
  const endpoint: Endpoint = "status";

  const apiSubmissionData = [
    { name: "Todo", workspace: workspaceId, order: 3 },
    { name: "In-progress", workspace: workspaceId, order: 2 },
    { name: "Done", workspace: workspaceId, order: 1 },
  ];

  apiSubmissionData.forEach(async (obj) => {
    let response;
    try {
      response = await apiCreate(endpoint, userId, obj);
    } catch (error) { // eslint-disable-line
      throw new Error("Failed to create statuses from template.");
    }

    // handle fetch failed responses
    if (!response.ok) {
      throw new Error("Failed to create statuses from template.");
    }
  });
}

export async function createPrioritiesTemplate(
  userId: string,
  workspaceId: string,
) {
  const endpoint: Endpoint = "priority";

  const apiSubmissionData = [
    { name: "Low", workspace: workspaceId, order: 1 },
    { name: "Medium", workspace: workspaceId, order: 2 },
    { name: "High", workspace: workspaceId, order: 3 },
  ];

  apiSubmissionData.forEach(async (obj) => {
    let response;
    try {
      response = await apiCreate(endpoint, userId, obj);
    } catch (error) { // eslint-disable-line
      throw new Error("Failed to create statuses from template.");
    }

    // handle fetch failed responses
    if (!response.ok) {
      throw new Error("Failed to create statuses from template.");
    }
  });
}
