import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { PasswordCheckList, passwordRules } from "./PasswordCheckList";
import { Label } from "./ui/label";
import { Input } from "./ui/Input";
import { useState } from "react";
import { Button } from "./ui/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

function AuthPanel() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const { signUp, signIn } = useAuth();
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
      const failed = passwordRules.filter((r) => !r.test(password));
      if (failed.length > 0) {
        newErrors.password = `Password must include:${failed.map((r) => r.toLowerCase().join(", "))}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async () => {
    setFormError("");
    if (!validate("login")) return;
    setBusy(true);
    try {
      console.log(await signIn(email, password));
      navigate("/dashboard");
    } catch (err) {
      setFormError(err?.message || "Invalid username or password");
    } finally {
      setBusy(false);
    }
  };
  const register = async () => {
    setFormError("");
    if (!validate("register")) return;
    setBusy(true);
    try {
      await signUp(email, password);
      navigate("/dashboard");
    } catch (err) {
      setErrors(err?.message || "Registration failed. Please try again");
    } finally {
      setBusy(false);
    }
  };

  console.log(errors);

  return (
    <div className="panel p-6 mt-6">
      <Tabs
        value={activeTab}
        onValueChange={(val) => {
          setActiveTab(val);
          setErrors({});
          setFormError("");
        }}
      >
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
              aria-invalid={!!errors.email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email)
                  setErrors((p) => ({ ...p, email: undefined }));
              }}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              aria-invalid={!!errors.password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors((p) => ({ ...p, password: undefined }));
              }}
            />
            {activeTab === "register" && password.length > 0 && (
              <PasswordCheckList password={password} />
            )}
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          {formError && (
            <p className="text-sm text-red-500 text-center">{formError}</p>
          )}
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
