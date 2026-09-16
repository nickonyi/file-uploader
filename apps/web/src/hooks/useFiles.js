import { useCallback, useEffect, useState } from "react";
import * as fileApi from "../../api/fileApi";

export function useFiles(folderId = null) {
  const [files, setFiles] = useState();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const loadFiles = useCallback(async () => {
    setBusy(true);
    setError(null);

    try {
      console.log("chief chef");

      const data = await fileApi.listFiles({ folderId });
      console.log(data);

      setFiles(data);
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }, [folderId]);

  useEffect(() => {
    console.log("notorious");
    loadFiles();
  }, [loadFiles]);

  return {
    files,
    busy,
    error,
    reloadFiles: loadFiles,
  };
}
