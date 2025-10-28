import { API_URL } from "@/constants/Api";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/users/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login Failed");
  }
  return res.json();
};

export const registerUser = async (
  userName: string,
  email: string,
  password: string
) => {
  const res = await fetch(`${API_URL}/users/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, userName, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login Failed");
  }
  return res.json();
};
