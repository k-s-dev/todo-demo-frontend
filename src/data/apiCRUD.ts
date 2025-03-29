"use server";

import {
  baseUrl,
  deleteBaseOptions,
  getBaseOptions,
  postBaseOptions,
  putBaseOptions,
} from "@/lib/apiConfig";

export async function apiCreate<DataType>(
  endpoint: Endpoint,
  userId: string,
  data: DataType,
): Promise<Response> {
  const apiUrl = `${baseUrl}/user/${userId}/${endpoint}/`;
  const response = await fetch(apiUrl, {
    ...postBaseOptions,
    body: JSON.stringify(data),
  });
  return response;
}

export async function apiRead(endpoint: Endpoint, userId: string, id: string) {
  const apiUrl = `${baseUrl}/user/${userId}/${endpoint}/${id}/`;
  const response = await fetch(apiUrl, {
    headers: getBaseOptions.headers,
  });
  return response;
}

export async function apiUpdate<DataType>(
  endpoint: Endpoint,
  userId: string,
  id: number,
  data: DataType,
) {
  const apiUrl = `${baseUrl}/user/${userId}/${endpoint}/${id}/`;
  const response = await fetch(apiUrl, {
    ...putBaseOptions,
    body: JSON.stringify(data),
  });
  return response;
}

export async function apiDelete(
  endpoint: Endpoint,
  userId: string,
  id: string,
) {
  const apiUrl = `${baseUrl}/user/${userId}/${endpoint}/${id}/`;
  const response = await fetch(apiUrl, {
    ...deleteBaseOptions,
  });
  return response;
}

export type Endpoint =
  | "workspace"
  | "category"
  | "status"
  | "priority"
  | "tag"
  | "project"
  | "task";
