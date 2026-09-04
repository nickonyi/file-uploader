import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { UploadDropzone } from "./UploadDropzone";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { FolderPlus, Folder } from "lucide-react";

function Files() {
  const { user } = useAuth();
  const [newFolder, setNewFolder] = useState();

  const folders = [];
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold">My files</h1>
        <p className="text-sm text-muted-foreground">
          {" "}
          Files uploaded here are not inside any folder.
        </p>
      </div>
      {user ? <UploadDropzone /> : "null"}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Folders</h2>
        <div className="flex gap-2">
          <Input
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
          />
          <Button>
            <FolderPlus className="mr-2 w-4 h-4" /> Create
          </Button>
        </div>

        {folders.data && folders.data.length > 0 ? (
          folders.data.map((folder) => (
            <li key={folder.id}>
              <Link to="/folders/$id">
                <Folder className="w-5 h-5 text-primary" />
                <span className="font-medium">{folder.name}</span>
              </Link>
            </li>
          ))
        ) : (
          <p className="panel p-6 text-center text-sm text-muted-foreground">
            No folders yet
          </p>
        )}
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Loose files</h2>
      </section>
    </div>
  );
}

export default Files;
