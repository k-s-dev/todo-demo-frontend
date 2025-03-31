"use server";

import { apiUpdate, Endpoint } from "@/data/apiCRUD";
import {
  Task,
  TaskApi,
  TaskFormKeys,
  TaskFormState,
  TaskUpdateData,
} from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updateTaskVisibility(
  userId: string,
  task: Task,
  newData: TaskUpdateData,
): Promise<TaskFormState> {
  // prepare form data for submission to backend
  const prevSubmissionData = {
    title: task.title,
    detail: task.detail,
    is_visible: task.is_visible,
    workspace: task.workspace,
    category: task.category,
    priority: task.priority,
    status: task.status,
    tags: task.tags,
    estimated_start_date: task.estimated_start_date,
    estimated_end_date: task.estimated_end_date,
    actual_start_date: task.actual_start_date,
    actual_end_date: task.actual_end_date,
    estimated_effort: task.estimated_effort,
    actual_effort: task.actual_effort,
  };

  const apiSubmissionData = {
    ...prevSubmissionData,
    ...newData,
  };

  let key: TaskFormKeys;
  for (key in apiSubmissionData) {
    if (!["is_visible"].includes(key) && !apiSubmissionData[key]) {
      delete apiSubmissionData[key];
    }
  }

  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "task";

  try {
    response = await apiUpdate<TaskApi>(
      endpoint,
      userId,
      task.id,
      apiSubmissionData,
    );
  } catch (error) { // eslint-disable-line
    return {
      data: apiSubmissionData,
      message: `Server error: Failed to create resource.`,
    };
  }

  // handle fetch failed responses
  if (!response.ok) {
    return {
      data: apiSubmissionData,
      message: `Server error: Failed to create resource.`,
    };
  }

  // revalidate and redirect
  revalidateTag("user-data");
  redirect(`/dashboard`);
}
