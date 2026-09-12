import { useCallback, useEffect, useState } from "react";
import * as uploadFileApi from "../../api/fileApi";

export function useFiles(folderId = null) {
  const [files, setFiles] = useState();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const loadFiles = useCallback(async () => {
    setBusy(true);
    setError(null);

    try {
      const data = await uploadFileApi.listFiles({ folderId });
      setFiles(data);
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }, [folderId]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  return {
    files,
    busy,
    error,
    reloadFiles: loadFiles,
  };
}
