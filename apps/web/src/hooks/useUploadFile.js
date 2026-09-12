import { useState } from "react";
import * as uploadFileApi from "../../api/fileApi";

export const useUploadFile = () => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const uploadData = async ({ folderId, file }) => {
    setBusy(true);
    setError(null);

    try {
      const data = await uploadFileApi.uploadFile({ folderId, file });
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setBusy(false);
    }
  };

  return {
    uploadData,
    busy,
    setBusy,
    error,
  };
};
