import { FolderLock } from "lucide-react";

function Login() {
  return (
    <div className="flex flex-col mt-12 mx-4  lg:flex">
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 items-center text-green-900">
          <FolderLock size={40} />
          <p className="text-2xl font-semibold">Vault</p>
        </div>
        <h1 className="text-4xl mt-6 font-semibold sm:text-5xl">
          Your file, your folder, your rules.
        </h1>
        <p className="mt-6 text-muted-foreground">
          A simple personal file uploader: drop files in, keep them in folders,
          and hand out a public link that expires when you say so.
        </p>
      </div>
      <div></div>
    </div>
  );
}

export default Login;
