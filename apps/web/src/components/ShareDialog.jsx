import { useState } from "react";
import { Button } from "./ui/Button";
import { Link2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { SHARE_DURATIONS } from "../libs/file-rules";

function ShareDialog({ folderId }) {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState("24");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Link2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this folder</DialogTitle>
          <DialogDescription>
            Anyone with the link can view and download the files until it
            expires.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <p className="mb-1 text-sm text-muted-foreground">Expires after</p>
            <Select value={hours} onValueChange={setHours}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SHARE_DURATIONS.map((duration) => (
                  <SelectItem
                    key={duration.hours}
                    value={String(duration.hours)}
                  >
                    {duration.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button>Create link</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShareDialog;
