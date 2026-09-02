import { api } from "./client";

export const signUp = (email, password) => {
  return api("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const signIn = (email, password) => {
  return api("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const signOut = () => {
  return api("/auth/signout", {
    method: "POST",
  });
};
