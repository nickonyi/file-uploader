import { deleteFileRequest } from "../../api/fileApi";

export function useDeleteFile() {
  async function deleteFile(fileApi) {
    return await deleteFileRequest(fileApi);
  }

  return {
    deleteFile,
  };
}
