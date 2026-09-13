const API_URL = import.meta.env.VITE_API_URL;

export const uploadFile = async ({ file, folderId }) => {
  const formData = new FormData();

  formData.append("file", file);

  if (folderId) {
    formData.append("folderId", folderId);
  }

  const res = await fetch(`${API_URL}/api/files/uploads`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(formData),
  });

  console.log(res);

  if (!res.ok) {
    throw Error("failed to upload file");
  }

  return res.json();
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
