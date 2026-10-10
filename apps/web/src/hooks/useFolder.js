import { useCallback, useEffect, useState } from "react";
import * as folderApi from "../../api/folderApi";

export function useFolder(id) {
  const [folder, setFolder] = useState(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setBusy(true);
      setError(null);
      try {
        const data = await folderApi.getFolder(id);
        if (!cancelled) setFolder(data.folder);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const renameFolder = useCallback(async (id, name) => {
    const data = await folderApi.renameFolder(id, name);
    setFolder((prev) => ({ ...prev, ...data.folder }));
  }, []);

  const deleteFolder = useCallback(
    async (id) => {
      await folderApi.deleteFolder(id);
    },
    [id],
  );

  return { folder, busy, error, deleteFolder, renameFolder };
}
