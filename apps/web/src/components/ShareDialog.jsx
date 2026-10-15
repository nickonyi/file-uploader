import { useState } from "react";
import { Button } from "./ui/Button";
import { Link2, Copy, Trash2 } from "lucide-react";
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
import { useShareFolder } from "../hooks/useShare";
import { toast } from "sonner";
import { formatDate } from "../libs/file-rules";

function ShareDialog({ folderId }) {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState("24");
  const { createShare, shares, loadShares, deleteShare } = useShareFolder();

  const handleCreateShare = async () => {
    try {
      await createShare(folderId, hours);
      loadShares(folderId);
      toast.success("Share link created");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Deleted Failed!");
    }
  };

  const shareUrl = (token) => {
    return `${window.location.origin}/share/${token}`;
  };
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
          <Button onClick={handleCreateShare}>Create link</Button>
        </div>

        <div className="space-y-2">
          {(shares ?? []).map((share) => (
            <div key={share.id} className="rounded-lg border border-border p-3">
              <p className="break-all text-xs">{shareUrl(share.token)}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Expires {formatDate(share.expires_at)}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Copy link"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        shareUrl(share.token),
                      );
                      toast.success("Link copied");
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Revoke link"
                    onClick={async () => {
                      await deleteShare({ id: share.id });
                      await loadShares(folderId);
                      toast.success("Link revoked");
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {shares && shares.length === 0 ? (
            <p className="text-sm text-muted-foreground">No links yet.</p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShareDialog;
