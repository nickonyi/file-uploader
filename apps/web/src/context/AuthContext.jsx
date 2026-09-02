import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as authApi from "../../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);

  const SESSION_KEY = "fileU:user";

  useEffect(() => {
    const storedUser = localStorage.getItem(SESSION_KEY);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      }
    }
    setReady(true);
  }, []);

  const signUp = useCallback(async (email, password) => {
    try {
      const data = await authApi.signUp(email, password);
      setUser(data.user);
      localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));

      return {
        success: true,
        user: data.user,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    const data = await authApi.signIn(email, password);

    setUser(data.user);

    return data.user;
  }, []);

  const signOut = useCallback(async () => {
    await authApi.signOut();
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ ready, user, signIn, signUp, signOut }),
    [ready, user, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};
