import { UploadCloud } from "lucide-react";
import { Button } from "./ui/Button";
import { useState } from "react";
import { MAX_FILE_SIZE } from "../libs/file-rules";
import { toast } from "sonner";

export function UploadDropzone({ folderId, userId, onUploaded }) {
  const [file, setFile] = useState();
  const [busy, setBusy] = useState(false);

  const uploadFile = () => {};

  return (
    <div className="panel flex flex-col items-center gap-3 border-dashed p-8 text-center">
      <UploadCloud className="h-8 w-8 text-primary" />
      <div>
        <p className="font-medium">Drop files here to upload</p>
        <p className="text-sm text-muted-foreground">
          Up to {Math.round(MAX_FILE_SIZE / (1024 * 1024))} MB each — images,
          PDF, text, CSV, JSON, zip, Office docs
        </p>
      </div>
      <input
        type="file"
        multiple
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <Button disabled={busy}>{busy ? "Uploading..." : "Choose files"}</Button>
    </div>
  );
}
