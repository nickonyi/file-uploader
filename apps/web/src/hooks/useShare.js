import { useCallback, useState } from "react";
import * as folderApi from "../../api/folderApi";

export function useShareFolder() {
  const [shares, setShares] = useState([]);

  const loadShares = async (id) => {
    const data = await folderApi.listShares(id);

    setShares(data.shares);
  };
  const createShare = useCallback(async (id, hours) => {
    await folderApi.shareFolder(id, hours);
  }, []);

  const deleteShare = useCallback(async ({ id }) => {
    await folderApi.deleteShare({ id });
  }, []);
  return {
    shares,
    createShare,
    loadShares,
    deleteShare,
  };
}
