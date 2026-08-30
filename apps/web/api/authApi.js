import { api } from "./client";

export const signIn = (email, password) => {
  return api("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};
