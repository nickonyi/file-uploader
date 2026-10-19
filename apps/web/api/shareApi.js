import { api } from "./client";

export const getSharedFolder = (token) => {
  return api(`/folders/shares/${token}`, {
    method: "GET",
  });
};
