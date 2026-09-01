import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { PasswordCheckList, passwordRules } from "./PasswordCheckList";
import { Label } from "./ui/label";
import { Input } from "./ui/Input";
import { useState } from "react";
import { Button } from "./ui/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function AuthPanel() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const { ready, currentUser, signIn } = useAuth();
  const navigate = useNavigate();

  const EMAIL_RE = /\S+@\S+\.\S+/;

  const validate = (mode) => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!EMAIL_RE.test(email.trim())) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (mode === "registered") {
      const pwErrors = getPasswords(password);
      if (pwErrors.length > 0) {
        newErrors.password = `Passwords must include:${pwErrors.join(", ")}`;
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const login = () => {};
  const register = async () => {
    setBusy(true);
    const result = await signIn(email, password);
    console.log(result);
  };

  return (
    <div className="panel p-6 mt-6">
      <Tabs defaultValue="login">
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value="login">
            Login
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="register">
            Register
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="login" className="my-4 mx-0">
          <Button
            className="w-full px-0"
            disabled={busy}
            onClick={() => void login()}
          >
            {busy ? "Please wait…" : "Log in"}
          </Button>
        </TabsContent>
        <TabsContent value="register" className="my-4 mx-0">
          <Button
            className="w-full"
            disabled={busy}
            onClick={() => void register()}
          >
            {busy ? "Please wait…" : "Create account"}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthPanel;
