import { useCallback, useEffect, useState } from "react";
import * as folderApi from "../../api/folderApi";

export function useFolders() {
  const [folders, setFolders] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const loadFolders = useCallback(async () => {
    setBusy(true);
    setError(null);

    try {
      const data = await folderApi.listFolders();

      setFolders(data.folders);
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    loadFolders();
  }, [loadFolders]);

  const createFolder = useCallback(async (name) => {
    await folderApi.createFolder(name);
  }, []);

  return {
    folders,
    busy,
    error,
    createFolder,
    reloadFolders: loadFolders,
  };
}
