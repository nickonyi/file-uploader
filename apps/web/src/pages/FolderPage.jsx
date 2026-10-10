import { useParams, useNavigate, Link } from "react-router";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useFiles } from "../hooks/useFiles";
import { useFolder } from "../hooks/useFolder";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { UploadDropzone } from "../components/UploadDropzone";
import FileTable from "../components/FileTable";
import { Button } from "../components/ui/Button";
import ShareDialog from "../components/ShareDialog";
import { Input } from "../components/ui/Input";
import { toast } from "sonner";
import { useFolders } from "../hooks/useFolders";

function FolderPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { folder, renameFolder, deleteFolder } = useFolder(id);

  console.log(folder);

  const { files, reloadFiles } = useFiles(id);

  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState("");

  const handleRenameFolder = async () => {
    try {
      await renameFolder(id, name);
      setRenaming(false);
      toast.success("Folder renamed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Rename failed");
    }
  };

  const handleDeleteFoder = async () => {
    try {
      await deleteFolder(id);
      navigate("/dashboard");
      toast.success("successfully deleted folder");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Deleted Failed!");
    }
  };

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <Link
        to="/dashboard"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        All files
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {renaming ? (
          <div className="flex flex-1 gap-2">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Button onClick={handleRenameFolder}>Save</Button>
            <Button variant="ghost" onClick={() => setRenaming(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <h1 className="text-2xl font-semibold">{folder?.name ?? "Folder"}</h1>
        )}
        {!renaming ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setName(folder.name ?? "");
                setRenaming(true);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" /> Rename
            </Button>
            <ShareDialog folderId={id} />
            <Button variant="outline" onClick={handleDeleteFoder}>
              <Trash2 className="mr-2 h-4 w-4 text-destructive" />
              Delete
            </Button>
          </div>
        ) : null}
      </div>

      {user ? <UploadDropzone folderId={id} onUploaded={reloadFiles} /> : null}

      <FileTable files={files ?? []} onChanged={reloadFiles} />
    </main>
  );
}

export default FolderPage;
