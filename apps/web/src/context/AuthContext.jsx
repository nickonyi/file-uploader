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
  const [currentUser, setCurrentUser] = useState(null);

  const SESSION_KEY = "fu:user";

  useEffect(() => {
    const storedUser = localStorage.getItem(SESSION_KEY);

    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem(SESSION_KEY);
        setCurrentUser(null);
      }
    }
    setReady(true);
  }, []);

  const signIn = useCallback(async (email, password) => {
    try {
      const data = await authApi.signIn(email, password);
      setCurrentUser(data.user);
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
  const value = useMemo(
    () => ({ ready, currentUser, signIn }),
    [ready, currentUser, signIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};
