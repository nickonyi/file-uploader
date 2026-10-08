import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { UploadDropzone } from "./UploadDropzone";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { FolderPlus, Folder } from "lucide-react";
import FileTable from "./FileTable";
import { useFiles } from "../hooks/useFiles";
import { useFolders } from "../hooks/useFolders";
import { toast } from "sonner";

function Files() {
  const { user } = useAuth();
  const [newFolder, setNewFolder] = useState("");

  const { files, busy, error, reloadFiles } = useFiles(null);
  const { folders, createFolder, error: folderErr } = useFolders();

  const handleCreateFolder = async () => {
    try {
      await createFolder(newFolder);
      setNewFolder("");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not create folder",
      );
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold">My files</h1>
        <p className="text-sm text-muted-foreground">
          {" "}
          Files uploaded here are not inside any folder.
        </p>
      </div>
      {user ? (
        <UploadDropzone folderId={null} onUploaded={reloadFiles} />
      ) : (
        "null"
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Folders</h2>
        <div className="flex gap-2">
          <Input
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
          />
          <Button onClick={() => handleCreateFolder()}>
            <FolderPlus className="mr-2 w-4 h-4" /> Create
          </Button>
        </div>

        {folders && folders.length > 0 ? (
          <ul className="panel divide-y divide-border">
            {folders.map((folder) => (
              <li key={folder.id}>
                <Link
                  to={`/folders/${folder.id}`}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent"
                >
                  <Folder className="w-5 h-5 text-primary" />
                  <span className="font-medium">{folder.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="panel p-6 text-center text-sm text-muted-foreground">
            No folders yet
          </p>
        )}
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Loose files</h2>
        <FileTable files={files} onChanged={reloadFiles} />
      </section>
    </div>
  );
}

export default Files;
