import { FolderLock } from "lucide-react";

function SharePage() {
  const shared = [];
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <div className="flex items-center gap-2 text-primary">
        <FolderLock className="h-5 w-5" />
        <span className="font-display font-semibold">Vault</span>
      </div>

      {shared.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : null}

      {shared.data?.status === "invalid" ? (
        <p className="panel p-6 text-center">This share link is not valid.</p>
      ) : null}

      {shared.data?.status === "expired" ? (
        <p className="panel p-6 text-center">This share link has expired.</p>
      ) : null}

      {shared.data?.status === "ok" ? (
        <>
          <div>
            <h1 className="text-2xl font-semibold">{shared.data.folderName}</h1>
            <p className="text-sm text-muted-foreground">
              Shared folder · link expires {formatDate(shared.data.expiresAt)}
            </p>
          </div>
          <FileTable
            files={shared.data.files}
            onDownload={(fileId) =>
              getSharedDownloadUrl({ data: { token, fileId } })
            }
          />
        </>
      ) : null}
    </main>
  );
}

export default SharePage;
