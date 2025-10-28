import { API_URL } from "@/constants/Api";
import * as SecureStore from "expo-secure-store";

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/users/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Đăng nhập thất bại");
  }

  return response.json();
};

export const registerUser = async (data: any): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/users/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Đăng ký thất bại");
  }

  return response.json();
};

export const fetchUserByToken = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Xác thực phiên làm việc thất bại");
  }

  // Giả định API trả về trực tiếp đối tượng User
  return response.json();
};
