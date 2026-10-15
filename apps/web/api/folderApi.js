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

export const getFolder = async (id) => {
  return api(`/folders/${id}`, { method: "GET" });
};

export const renameFolder = async (id, name) => {
  return api(`/folders/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
};

export const deleteFolder = async (id) => {
  return api(`/folders/${id}`, {
    method: "DELETE",
  });
};

export const shareFolder = async (id, hours) => {
  return api(`/folders/${id}/share`, {
    method: "POST",
    body: JSON.stringify({ hours }),
  });
};

export const listShares = async (id, hours) => {
  return api(`/folders/${id}/shares`, {
    method: "GET",
  });
};

export const deleteShare = async ({ id }) => {
  return api(`/folders/${id}/shares`, {
    method: "DELETE",
  });
};
