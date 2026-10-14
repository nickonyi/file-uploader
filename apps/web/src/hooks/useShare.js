import { useCallback } from "react";
import * as folderApi from "../../api/folderApi";

export function useShareFolder() {
  const createShare = useCallback(async (id, hours) => {
    await folderApi.shareFolder(id, hours);
  }, []);

  return {
    createShare,
  };
}
