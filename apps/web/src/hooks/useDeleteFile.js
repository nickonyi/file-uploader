import { deleteFileRequest } from "../../api/fileApi";

export function useDeleteFile() {
  async function deleteFile(fileApi) {
    return deleteFileRequest(fileApi);
  }

  return {
    deleteFile,
  };
}
