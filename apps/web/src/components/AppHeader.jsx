import { useNavigate, Link } from "react-router";
import { FolderLock, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/Button";

function AppHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b border-border bg-card/60 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link
          to="/files"
          className="flex items-center gap-2 font-display-text-lg font-semibold"
        >
          <FolderLock className="w-5 h-5 text-primary" />
          Vault
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {user?.email}
          </span>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="mr-2 h-4 2-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
