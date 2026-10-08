import { api } from "./client";

export const listFolders = async () => {
  return api("/folders", { method: "GET" });
};

export const createFolder = async (name) => {
  return api("/folders", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
};
