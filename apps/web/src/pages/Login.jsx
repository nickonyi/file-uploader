import { FolderLock, CloudUpload, ShieldCheck, Share2 } from "lucide-react";
import AuthPanel from "../components/AuthPanel";

function Login() {
  return (
    <main className="mx-auto grid min-h-screen max-w-5xl items-center gap-10 px-4 py-12 lg:grid-cols-2">
      <section className="flex flex-col gap-6">
        <div className="flex gap-2 items-center text-green-900">
          <FolderLock size={40} />
          <p className="text-2xl font-semibold">Vault</p>
        </div>
        <h1 className="text-4xl mt-6 font-semibold sm:text-5xl">
          Your files, your folders, your rules.
        </h1>
        <p className="mt-6 text-muted-foreground">
          A simple personal file uploader: drop files in, keep them in folders,
          and hand out a public link that expires when you say so.
        </p>
        <div className="flex flex-col">
          <div className="flex gap-4">
            <CloudUpload className="mt-0.5 h-5 text-primary" />
            <p>
              Validated uploads up to 25 MB, on their own or inside a folder.
            </p>
          </div>
          <div className="flex gap-4">
            <ShieldCheck className="mt-0.5 h-5 text-primary" />
            <p>
              Validated uploads up to 25 MB, on their own or inside a folder.
            </p>
          </div>
          <div className="flex gap-4">
            <Share2 className="mt-0.5 h-5 text-primary" />
            <p>
              Share a folder with a link that expires in an hour, a day, or a
              month.
            </p>
          </div>
        </div>
      </section>
      <AuthPanel />
    </main>
  );
}

export default Login;
