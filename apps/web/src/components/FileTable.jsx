import { Download, FileText, Info, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { formatBytes, formatDate } from "../libs/file-rules";
import { useState } from "react";

function FileTable({ files, onChanged, onDownload }) {
  const [details, setDetails] = useState(null);

  const download = () => {};

  if (files.length === 0) {
    return (
      <p className="panel p-6 text-center text-sm text-muted-foreground">
        No files here yet.
      </p>
    );
  }
  return (
    <>
      <ul className="panel divide-y divide-border p-6">
        {files.map((file) => (
          <li key={file.id} className="flex items-center gap-3 px-4 py-3">
            <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{file.name}</p>
              <p className="text-xs text-muted-foregroubd">
                {formatBytes(Number(file.size))} · {file.mime_type} ·{" "}
                {formatDate(file.created_at)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="File details"
              onClick={() => setDetails(file)}
            >
              <Info className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Download file"
              onClick={() => download(file)}
            >
              <Download className="h-4 w-4" />
            </Button>
            {onChanged ? (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete file"
                onClick={() => remove(file)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            ) : null}
          </li>
        ))}
      </ul>

      <Dialog
        open={details !== null}
        onOpenChange={(open) => !open && setDetails(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="truncate">{details?.name}</DialogTitle>
            <DialogDescription>File details</DialogDescription>
          </DialogHeader>
          {details ? (
            <dl className="grid grid-cols-3 gap-y-3 text-sm">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="col-span-2 break-all">{details.name}</dd>
              <dt className="text-muted-foreground">Size</dt>
              <dd className="col-span-2">{formatBytes(details.size)}</dd>
              <dt className="text-muted-foreground">Type</dt>
              <dd className="col-span-2">{details.mime_type}</dd>
              <dt className="text-muted-foreground">Uploaded</dt>
              <dd className="col-span-2">{formatDate(details.created_at)}</dd>
            </dl>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FileTable;
