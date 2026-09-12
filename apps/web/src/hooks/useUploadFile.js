import { useState } from "react";
import * as uploadFileApi from "../../api/fileApi";

export const useUploadFile = () => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const uploadData = async ({ fileId, folder }) => {
    setBusy(true);
    setError(null);

    try {
      const data = await uploadFileApi.uploadFile({ fileId, folder });
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  };

  return {
    uploadData,
    busy,
    error,
  };
};
