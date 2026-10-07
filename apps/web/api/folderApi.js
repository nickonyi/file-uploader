import { api } from "./client";

export const listFolders = async () => {
  return api("/folders", { method: "GET" });
};

export const createFolder = async () => {
  return api("/folders", { method: "POST" });
};
