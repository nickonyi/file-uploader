import { getDownloadUrl } from "../../api/fileApi";

export function useDownloadFile() {
  async function downloadFile(fileId) {
    return getDownloadUrl(fileId);
  }

  return {
    downloadFile,
  };
}
