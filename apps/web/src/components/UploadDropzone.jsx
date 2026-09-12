import { UploadCloud } from "lucide-react";
import { Button } from "./ui/Button";
import { MAX_FILE_SIZE, validateFile } from "../libs/file-rules";
import { toast } from "sonner";
import { useUploadFile } from "../hooks/useUploadFile";
import { useRef } from "react";

export function UploadDropzone({ folderId, onUploaded }) {
  const inputRef = useRef(null);
  const { uploadData, busy } = useUploadFile();

  const uploadFiles = async (fileList) => {
    if (!fileList || fileList.length === 0) return;

    for (const file of Array.from(fileList)) {
      const problem = validateFile(file);
      if (problem) {
        toast.error(`${file.name},${problem}`);
        continue;
      }
      try {
        await uploadData({ folderId, file });
      } catch (error) {
        toast.error(`${file.name}: ${error.message}`);
      }
    }
    onUploaded?.();
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        uploadFiles(e.dataTransfer.files);
      }}
      className="panel flex flex-col items-center gap-3 border-dashed p-8 text-center"
    >
      <UploadCloud className="h-8 w-8 text-primary" />
      <div>
        <p className="font-medium">Drop files here to upload</p>
        <p className="text-sm text-muted-foreground">
          Up to {Math.round(MAX_FILE_SIZE / (1024 * 1024))} MB each — images,
          PDF, text, CSV, JSON, zip, Office docs
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => uploadFiles(e.target.files)}
      />
      <Button onClick={() => inputRef.current.click()} disabled={busy}>
        {busy ? "Uploading..." : "Choose files"}
      </Button>
    </div>
  );
}
