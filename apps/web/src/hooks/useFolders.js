import { useCallback, useState } from "react";
import * as folderApi from "../api/folderApi";

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

  const createFolder = (name) => {};
}
