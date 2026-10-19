import { useEffect, useState } from "react";
import * as shareApi from "../../api/shareApi";

export function useSharedFolder(token) {
  const [folder, setFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setBusy(true);
      setError(null);
      try {
        const data = await shareApi.getSharedFolder(token);

        if (!cancelled) {
          setFolder(data.folder);
          setFiles(data.files);
        }
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return { folder, files, busy, error };
}
