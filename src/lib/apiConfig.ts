export const baseUrl = process.env.API_ROOT;

export const apiAuthString =
  process.env.API_USERNAME + ":" + process.env.API_PASSWORD;

export const fetchAuthHeader = {
  Authorization: `Basic ${btoa(apiAuthString)}`,
};

export const fetchHeaderBase = {
  ...fetchAuthHeader,
  "Content-Type": "application/json",
};

export const getBaseOptions = {
  method: "GET",
  headers: fetchHeaderBase,
  cache: "force-cache" as RequestCache,
  next: {
    tags: [
      "user-data",
    ]
  }
};

export const postBaseOptions = {
  method: "POST",
  headers: fetchHeaderBase,
};

export const putBaseOptions = {
  method: "PUT",
  headers: fetchHeaderBase,
};

export const deleteBaseOptions = {
  method: "DELETE",
  headers: fetchHeaderBase,
};

