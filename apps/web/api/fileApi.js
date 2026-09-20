const API_URL = import.meta.env.VITE_API_URL;
import { api } from "./client";

export const uploadFile = async ({ file, folderId }) => {
  const formData = new FormData();

  formData.append("file", file);

  if (folderId) {
    formData.append("folderId", folderId);
  }

  return api("/files/uploads", { method: "POST", body: formData });
};

export const listFiles = async ({ folderId = null }) => {
  const params = new URLSearchParams();

  if (folderId) {
    params.set("folderId", folderId);
  }

  const res = await fetch(`${API_URL}/api/files?${params}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw Error("Failed to load files");
  }

  return res.json();
};

export const getDownloadUrl = async (id) => {
  return api(`/files/${id}/downloads`, {
    method: "GET",
  });
};
