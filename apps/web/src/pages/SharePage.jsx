import { FolderLock } from "lucide-react";
import { useParams } from "react-router";
import { useSharedFolder } from "../hooks/useSharedFolder";
import { formatDate } from "../libs/file-rules";
import FileTable from "../components/FileTable";

function SharePage() {
  const { token } = useParams();
  const { folder, files, busy, error } = useSharedFolder(token);

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <div className="flex items-center gap-2 text-primary">
        <FolderLock className="h-5 w-5" />
        <span className="font-display font-semibold">Vault</span>
      </div>

      {busy ? <p className="text-sm text-muted-foreground">Loading…</p> : null}

      {error ? <p className="panel p-6 text-center">{error.message}</p> : null}

      {files ? (
        <>
          <div>
            <h1 className="text-2xl font-semibold">{folder?.folderName}</h1>
            <p className="text-sm text-muted-foreground">
              Shared folder · link expires {formatDate(folder?.expiresAt)}
            </p>
          </div>
          <FileTable files={files} />
        </>
      ) : null}
    </main>
  );
}

export default SharePage;
